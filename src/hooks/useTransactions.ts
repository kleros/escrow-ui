import {
  MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ADDRESS,
  MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS,
} from "config/contracts/addresses";
import { wagmiConfig } from "config/reown";
import { useAccount, useClient } from "wagmi";
import { multicall } from "wagmi/actions";
import { useQuery } from "@tanstack/react-query";
import { MULTIPLE_ARBITRABLE_TRANSACTION_ABI } from "config/contracts/abi/multipleArbitrableTransaction";
import { MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI } from "config/contracts/abi/mutlipleArbitrableTokenTransaction";
import { getLogs } from "viem/actions";
import { fetchBlockTimestamps } from "utils/common";
import { type Client } from "viem";
import { useMemo } from "react";
import { ipfsFetch } from "utils/ipfs";
import type { MetaEvidence } from "model/MetaEvidence";
import { TransactionStatus, type TransactionMini } from "model/Transaction";
import { mapTransactionStatus } from "utils/transaction";
import { QUERY_KEYS } from "config/queryKeys";
import {
  metaEvidenceEvent,
  type MetaEvidenceLogs,
} from "config/contracts/events";

//Batch fetch all tx IDs for the connected wallet, from all contracts
async function fetchTxIDsByContract(
  contractAddresses: `0x${string}`[],
  address: `0x${string}`
) {
  return await multicall(wagmiConfig, {
    contracts: [
      {
        abi: MULTIPLE_ARBITRABLE_TRANSACTION_ABI,
        address: contractAddresses[0],
        functionName: "getTransactionIDsByAddress",
        args: [address],
      },
      {
        abi: MULTIPLE_ARBITRABLE_TRANSACTION_ABI,
        address: contractAddresses[1],
        functionName: "getTransactionIDsByAddress",
        args: [address],
      },
      {
        abi: MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
        address: contractAddresses[2],
        functionName: "getTransactionIDsByAddress",
        args: [address],
      },
      {
        abi: MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
        address: contractAddresses[3],
        functionName: "getTransactionIDsByAddress",
        args: [address],
      },
    ],
  });
}

//Batch fetch details for the txIDs, for a given contract
async function fetchContractTxDetails(
  contractAddress: `0x${string}`,
  abi:
    | typeof MULTIPLE_ARBITRABLE_TRANSACTION_ABI
    | typeof MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
  txIDs: readonly bigint[]
) {
  return await multicall(wagmiConfig, {
    contracts: txIDs.map((txID) => ({
      abi,
      address: contractAddress,
      functionName: "transactions" as const,
      args: [txID],
    })),
  });
}

//Batch fetch meta evidence logs for the txIDs, for a given contract
async function fetchContractMetaEvidenceLogs(
  contractAddress: `0x${string}`,
  client: Client,
  txIDs: readonly bigint[]
) {
  return await getLogs(client, {
    address: contractAddress,
    event: metaEvidenceEvent,
    args: { _metaEvidenceID: [...txIDs] },
    fromBlock: 0n,
    toBlock: "latest",
  });
}

//Fetch from IPFS the JSON content for each log in the array
async function fetchLogsContentFromIPFS(logs: MetaEvidenceLogs) {
  return await Promise.all(
    logs.map(async (log) => {
      try {
        if (!log.args._evidence) return null;
        const content = await ipfsFetch(log.args._evidence);
        return content as MetaEvidence;
      } catch (error) {
        console.error(
          `Failed to fetch IPFS content for txID ${log.args._metaEvidenceID}: ${error}`
        );
        return null;
      }
    })
  );
}

function mapToTransactionMini(
  txID: bigint,
  blockTimestamp: bigint,
  contractAddress: `0x${string}`,
  metaEvidence: MetaEvidence,
  userParty: string,
  status: number,
  txAmountInEscrow: string,
  lastInteraction: number
): TransactionMini {
  return {
    id: txID,
    createdAt: new Date(
      parseInt(blockTimestamp.toString()) * 1000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    arbitrableAddress: contractAddress,
    metaEvidence: metaEvidence,
    userPartyLabel: userParty,
    otherPartyAddress:
      userParty === "sender" ? metaEvidence.receiver : metaEvidence.sender,
    formattedStatus: mapTransactionStatus(
      TransactionStatus[status],
      txAmountInEscrow
    ),
    lastInteraction: Number(lastInteraction),
  };
}

/**
 * NOTE: This hook intentionally does not use wagmi generated hooks because:
 * 1. It needs to handle 4 different contracts, with 2 different ABIs.
 * 2. It batches information fetching using multicall for better performance.
 * 3. It needs to fetch and process multiple types of data (transactions, logs, IPFS content).
 * Using generated hooks would make the code more complex and not as performant.
 */
export function useTransactions() {
  const { address, chain } = useAccount();
  const client = useClient();

  const contractAddresses = useMemo(() => {
    if (!chain) return [];

    return [
      MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS[chain.id]
        .BLOCKCHAIN_NON_TECHNICAL,
      MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS[chain.id].GENERAL_COURT,
      MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ADDRESS[chain.id]
        .BLOCKCHAIN_NON_TECHNICAL,
      MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ADDRESS[chain.id].GENERAL_COURT,
    ];
  }, [chain]);

  return useQuery<TransactionMini[]>({
    queryKey: [QUERY_KEYS.transactionList, address, chain?.id],
    queryFn: async () => {
      if (!chain || !address || !client) return [];

      //First get all txIDs, from the respective contracts
      const txIDsByContract = await fetchTxIDsByContract(
        contractAddresses,
        address
      );

      const txsByContract = await Promise.all(
        //Then, for each contract
        contractAddresses.map(async (contractAddress, contractIndex) => {
          //Get the respective txIDs
          const txIDs = txIDsByContract[contractIndex]?.result ?? [];
          if (!txIDs.length) return [];

          //Batch fetch details for the txIDs
          const txDetails = await fetchContractTxDetails(
            contractAddress,
            contractIndex < 2
              ? MULTIPLE_ARBITRABLE_TRANSACTION_ABI
              : MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
            txIDs
          );

          //Batch fetch meta evidence logs for the txIDs
          const metaEvidenceLogs = await fetchContractMetaEvidenceLogs(
            contractAddress,
            client,
            txIDs
          );

          //Batch fetch from IPFS the JSON content for each log
          const metaEvidenceContent =
            await fetchLogsContentFromIPFS(metaEvidenceLogs);

          //Batch fetch the timestamps for the block numbers
          const blockTimestamps = await fetchBlockTimestamps(
            client,
            metaEvidenceLogs.map((log) => log.blockNumber)
          );

          //Map the results to a TransactionMini object
          const txs = txDetails
            .map((tx, index) => {
              //Get the corresponding meta evidence content - we can rely on the order of Promise.all
              const metaEvidence = metaEvidenceContent[index];

              //Shouldn't happen, but if we did not get the details or the meta evidence, skip for now
              if (tx.status !== "success" || !metaEvidence) return null;

              //Note we can rely on the order of batch fetches
              return mapToTransactionMini(
                txIDs[index],
                blockTimestamps[index],
                contractAddress,
                metaEvidence,
                //For escrows between same address, metaevidence.aliases will priorize the receiver role, but the actions will be based on the sender role, so the below check is better for clarity
                //Use lowercase for comparison to account for situations where users copy addresses not checksummed
                metaEvidence.sender.toLowerCase() === address.toLowerCase()
                  ? "sender"
                  : "receiver",
                tx.result[tx.result.length - 1] as number, //status
                tx.result[2].toString(), //amount in escrow
                tx.result[tx.result.length - 2] as number //last interaction
              );
            })
            .filter((tx) => tx !== null); //remove nulls as we don't have the needed information to display

          return txs;
        })
      );

      //Return a single array of all transactions
      return txsByContract
        .flat()
        .sort((a, b) => b.lastInteraction - a.lastInteraction);
    },
    enabled: !!chain && !!address,
    initialData: [],
  });
}
