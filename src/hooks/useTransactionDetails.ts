import { useAccount, useClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getLogs, readContract } from "viem/actions";
import { formatUnits, type Client } from "viem";
import { ipfsFetch } from "utils/ipfs";
import type { MetaEvidence } from "model/MetaEvidence";
import { TransactionStatus, type Transaction } from "model/Transaction";
import { mapTransactionStatus } from "utils/transaction";
import { QUERY_KEYS } from "config/queryKeys";
import {
  addressToAbi,
  fetchBlockTimestamps,
  getBlockExplorerLink,
} from "utils/common";
import { formatTimelineEvents } from "utils/transaction";
import {
  appealDecisionEvent,
  disputeEvent,
  evidenceEvent,
  hasToPayFeeEvent,
  metaEvidenceEvent,
  paymentEvent,
  rulingEvent,
  type EvidenceLogs,
  type MetaEvidenceLogs,
  type TimelineEventLogs,
} from "config/contracts/events";
import type { Evidence } from "model/Evidence";
import type { TimelineEvent } from "model/TimelineEvent";

async function fetchDetails(
  client: Client,
  contractAddress: `0x${string}`,
  id: bigint
) {
  return await readContract(client, {
    abi: addressToAbi(contractAddress),
    address: contractAddress,
    functionName: "transactions" as const,
    args: [id],
  });
}

async function fetchArbitrator(client: Client, contractAddress: `0x${string}`) {
  return await readContract(client, {
    abi: addressToAbi(contractAddress),
    address: contractAddress,
    functionName: "arbitrator" as const,
  });
}

async function fetchTimelineEvents(
  client: Client,
  contractAddress: `0x${string}`,
  arbitratorAddress: `0x${string}`,
  id: bigint,
  disputeId: bigint
) {
  const [
    metaEvidenceLogs,
    paymentLogs,
    hasToPayFeeLogs,
    disputeLogs,
    appealDecisionLogs,
    evidenceLogs,
    rulingLogs,
  ] = await Promise.all([
    await getLogs(client, {
      address: contractAddress,
      event: metaEvidenceEvent,
      args: { _metaEvidenceID: id },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: paymentEvent,
      args: { _transactionID: id },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: hasToPayFeeEvent,
      args: { _transactionID: id },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: disputeEvent,
      args: { _disputeID: disputeId, _arbitrator: arbitratorAddress },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: appealDecisionEvent,
      args: { _disputeID: disputeId, _arbitrable: contractAddress },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: evidenceEvent,
      args: {
        _arbitrator: arbitratorAddress,
        _evidenceGroupID: id,
      },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    await getLogs(client, {
      address: contractAddress,
      event: rulingEvent,
      args: { _disputeID: disputeId, _arbitrator: arbitratorAddress },
      fromBlock: 0n,
      toBlock: "latest",
    }),
  ]);

  const ordered = [
    ...metaEvidenceLogs,
    ...paymentLogs,
    ...hasToPayFeeLogs,
    ...disputeLogs,
    ...appealDecisionLogs,
    ...evidenceLogs,
    ...rulingLogs,
  ].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));

  return ordered;
}

async function fetchMetaEvidenceContent(log: MetaEvidenceLogs[0]) {
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
}

async function fetchEvidenceContent(logs: EvidenceLogs) {
  return await Promise.all(
    logs.map(async (log) => {
      try {
        if (!log.args._evidence) return null;
        const content = (await ipfsFetch(log.args._evidence)) as Evidence;

        //Old UI allowed evidence to be text (e.g. links). This will no longer be the case, only PDFs.
        //However, to still display evidence such as this that was uploaded in the old UI, we can check if we downloaded an actual file by checking the fileURI.
        //If we didn't, just use the log URI, and the user will have access to the text evidence uploaded, in JSON format.
        if (!content.fileURI) {
          content.fileURI = log.args._evidence;
        }

        return content;
      } catch (error) {
        console.error(
          `Failed to fetch IPFS content for evidence ${log.args._evidence}: ${error}`
        );
        return null;
      }
    })
  );
}

function mapToTransaction(
  id: bigint,
  disputeId: bigint,
  blockTimestamp: bigint,
  contractAddress: `0x${string}`,
  metaEvidence: MetaEvidence,
  status: number,
  lastInteraction: number,
  amountInEscrow: string,
  blockExplorerLink: string,
  timelineEvents: TimelineEvent[]
): Transaction {
  return {
    id: id,
    disputeId: disputeId,
    createdAt: new Date(
      parseInt(blockTimestamp.toString()) * 1000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    arbitrableAddress: contractAddress,
    metaEvidence: metaEvidence,
    status: mapTransactionStatus(TransactionStatus[status], amountInEscrow),
    lastInteraction: Number(lastInteraction),
    amountInEscrow: amountInEscrow,
    blockExplorerLink: blockExplorerLink,
    timeline: timelineEvents,
  };
}

interface Props {
  id: bigint;
  contractAddress: `0x${string}`;
}

/**
 * NOTE: This hook intentionally does not use wagmi generated hooks because:
 * 1. It would require determining which generated hooks to use based on the contract address.
 * 2. It batches information fetching for better performance.
 * 3. It needs to fetch and process multiple types of data (transaction details, event logs, IPFS content).
 * Using generated hooks would make the code more complex and not as performant.
 */
export function useTransactionDetails({ id, contractAddress }: Props) {
  const client = useClient();
  const { chainId } = useAccount();

  return useQuery<Transaction | undefined>({
    queryKey: [QUERY_KEYS.transactionDetails, id.toString(), contractAddress],
    queryFn: async () => {
      if (!client) return undefined;

      const [details, arbitratorAddress] = await Promise.all([
        fetchDetails(client, contractAddress, id),
        fetchArbitrator(client, contractAddress),
      ]);

      const disputeId = details[details.length - 5];

      const timelineEventsLogs = await fetchTimelineEvents(
        client,
        contractAddress,
        arbitratorAddress,
        id,
        disputeId as bigint
      );

      //MetaEvidence event is emmitted when the transaction is created, and since we need it to download the meta evidence from IPFS,
      //we can use it for the Transaction Creation timeline event
      const metaEvidenceLog = timelineEventsLogs[0] as MetaEvidenceLogs[0];
      const evidenceLogs = timelineEventsLogs.filter(
        (log) => log.eventName === evidenceEvent.name
      );

      const [metaEvidence, evidenceContent, blockTimestamps] =
        await Promise.all([
          fetchMetaEvidenceContent(metaEvidenceLog),
          fetchEvidenceContent(evidenceLogs),
          fetchBlockTimestamps(
            client,
            timelineEventsLogs.map((log) => log.blockNumber)
          ),
        ]);

      if (!metaEvidence) return undefined;

      const amountInEscrow = formatUnits(
        details[2],
        (metaEvidence.token?.decimals as number) ?? 18
      );

      const blockExplorerLink = getBlockExplorerLink(
        metaEvidenceLog.transactionHash,
        chainId ?? 1
      );

      const timelineEvents = formatTimelineEvents(
        timelineEventsLogs as TimelineEventLogs,
        evidenceLogs,
        evidenceContent as Evidence[],
        blockTimestamps,
        metaEvidence.receiver,
        metaEvidence.sender,
        metaEvidence.token?.ticker ?? "ETH",
        (metaEvidence.token?.decimals as number) ?? 18,
        chainId ?? 1
      );

      return mapToTransaction(
        id,
        disputeId as bigint,
        blockTimestamps[0], //we can rely on the order of Promise.all, so we can use the first timestamp for the createdAt date
        contractAddress,
        metaEvidence,
        details[details.length - 1] as number, // status
        details[details.length - 2] as number, //last interaction
        amountInEscrow,
        blockExplorerLink,
        timelineEvents
      );
    },
    enabled: typeof id === "bigint" && !!contractAddress,
    refetchOnWindowFocus: false,
  });
}
