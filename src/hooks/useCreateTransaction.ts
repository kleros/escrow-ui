import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ADDRESS,
  MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS,
} from "config/contracts/addresses";
import {
  useWriteMultipleArbitrableTokenTransactionCreateTransaction,
  useWriteMultipleArbitrableTransactionCreateTransaction,
} from "config/contracts/generated";
import { useAtlasProvider, Roles } from "@kleros/kleros-app";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";
import {
  parseUnits,
  zeroAddress,
  erc20Abi,
  isAddressEqual,
  parseEventLogs,
  type TransactionReceipt,
} from "viem";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
} from "viem/actions";
import { useAccount, useWriteContract, useClient } from "wagmi";
import { getBalance } from "wagmi/actions";
import { parseZonedDateTime } from "@internationalized/date";
import { BUFFER_PERIOD_IN_SECONDS } from "model/Transaction";
import { wagmiConfig } from "config/reown";
import { MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI } from "config/contracts/abi/mutlipleArbitrableTokenTransaction";
import { MULTIPLE_ARBITRABLE_TRANSACTION_ABI } from "config/contracts/abi/multipleArbitrableTransaction";
import { metaEvidenceEvent } from "config/contracts/events";
import { buildMetaEvidence } from "utils/metaEvidence";
import { isUserRejectedRequestError } from "utils/common";

export function useCreateTransaction() {
  const client = useClient();
  const navigate = useNavigate();
  const { chain } = useAccount();
  const { uploadFile } = useAtlasProvider();
  const {
    agreementFile,
    amount,
    deadline,
    description,
    escrowType,
    receiverAddress,
    senderAddress,
    title,
    token,
    resetContext,
  } = useNewTransactionContext();

  const { writeContractAsync: writeNativeContractAsync } =
    useWriteMultipleArbitrableTransactionCreateTransaction();

  const { writeContractAsync: writeTokenContractAsync } =
    useWriteMultipleArbitrableTokenTransactionCreateTransaction();

  const { writeContractAsync: writeTokenApproveAsync } = useWriteContract();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const isTokenTransaction = token.address !== zeroAddress;
  const court =
    escrowType === "Cryptocurrency Transaction"
      ? "BLOCKCHAIN_NON_TECHNICAL"
      : "GENERAL_COURT";

  const contractAddress = isTokenTransaction
    ? MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ADDRESS[chain!.id]?.[court]
    : MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS[chain!.id]?.[court];

  const formattedAmount = parseUnits(amount, token.decimals);
  const deadlineDate = parseZonedDateTime(deadline).toDate();
  const formattedDeadline = deadlineDate.toISOString();

  //The contract expects the timeout to be the difference between when the transaction is created and the actual date we want it to expire, not an actual expiry date.
  //If we just sent the actual expiry date, executing transactions would be pratically impossible, because the contract checks if the now - lastInteraction >= timeout.
  //To work around this, we calculate the difference between the deadline and the current time, and add the buffer period. This way, we can ensure that the timeout is always after the deadline.
  const now = Math.floor(Date.now() / 1000);
  const deadlineInSeconds = Math.floor(deadlineDate.getTime() / 1000);
  const secondsUntilDeadline = deadlineInSeconds - now;
  const timeoutWithBuffer = secondsUntilDeadline + BUFFER_PERIOD_IN_SECONDS;

  const handleIPFSUploads = async () => {
    //Upload agreement file to IPFS, if it exists
    const agreementFileURI = agreementFile
      ? await uploadFile(agreementFile, Roles.Evidence)
      : undefined;

    //Build and upload meta evidence to IPFS
    const metaEvidence = buildMetaEvidence({
      agreementFileURI,
      amount,
      arbitrableAddress: contractAddress,
      description,
      deadline: formattedDeadline,
      timeout: timeoutWithBuffer,
      receiverAddress,
      senderAddress,
      escrowType,
      title,
      token,
    });

    const metaEvidenceFile = new File(
      [JSON.stringify(metaEvidence)],
      "metaEvidence.json",
      { type: "application/json" }
    );

    const metaEvidenceURI = await uploadFile(metaEvidenceFile, Roles.Policy);
    if (!metaEvidenceURI) {
      throw new Error("Failed to upload meta evidence to IPFS");
    }

    return metaEvidenceURI;
  };

  const handleTokenContractApproval = async () => {
    //Check if the sender has enough allowance to cover the transaction amount
    const allowance = await readContract(client!, {
      address: token.address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [senderAddress as `0x${string}`, contractAddress],
    });

    //If not, ask for approval
    if (allowance < formattedAmount) {
      const approvalTxParams = {
        account: senderAddress as `0x${string}`, //Needed for the simulation, otherwise it will use the zero address and approve will fail
        address: token.address,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, formattedAmount],
      } as const;

      //Simulate the approval transaction
      await simulateContract(client!, approvalTxParams);

      // Request approval if simulation is successful
      const approvalTxHash = await writeTokenApproveAsync(approvalTxParams);

      //We have to wait for the approval before actually creating the escrow tx, or it will fail
      await waitForTransactionReceipt(client!, { hash: approvalTxHash });
    }
  };

  const handleTokenEscrowCreation = async (metaEvidenceURI: string) => {
    const createTokenTxParams = {
      account: senderAddress as `0x${string}`, //Needed for the simulation, otherwise it will use the zero address nd the transferFrom in the createTransaction function will fail
      abi: MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
      address: contractAddress as `0x${string}`,
      functionName: "createTransaction",
      args: [
        formattedAmount,
        token.address,
        BigInt(timeoutWithBuffer),
        receiverAddress as `0x${string}`,
        metaEvidenceURI,
      ],
    } as const;

    //Simulate the transaction
    await simulateContract(client!, createTokenTxParams);

    //Create the escrow transaction if simulation is successful
    const txHash = await writeTokenContractAsync(createTokenTxParams);
    return txHash;
  };

  const handleNativeEscrowCreation = async (metaEvidenceURI: string) => {
    const createNativeTxParams = {
      abi: MULTIPLE_ARBITRABLE_TRANSACTION_ABI,
      address: contractAddress as `0x${string}`,
      functionName: "createTransaction",
      args: [
        BigInt(timeoutWithBuffer),
        receiverAddress as `0x${string}`,
        metaEvidenceURI,
      ],
      value: formattedAmount,
    } as const;

    //Simulate the transaction
    await simulateContract(client!, createNativeTxParams);

    //Create the escrow transaction if simulation is successful
    const txHash = await writeNativeContractAsync(createNativeTxParams);
    return txHash;
  };

  //Every escrow contract version emits MetaEvidence on creation, and its _metaEvidenceID is the new escrow's ID.
  //Find it by emitter instead of by log position: the mainnet native contracts emit no TransactionCreated event, and some networks add protocol logs for ETH transfers.
  const getEscrowIdFromReceipt = (
    receipt: TransactionReceipt,
    escrowAddress: `0x${string}`
  ) => {
    const metaEvidenceLogs = parseEventLogs({
      abi: [metaEvidenceEvent],
      logs: receipt.logs.filter((log) =>
        isAddressEqual(log.address, escrowAddress)
      ),
    });

    if (metaEvidenceLogs.length !== 1) {
      throw new Error(
        `Expected 1 MetaEvidence event from the escrow contract, found ${metaEvidenceLogs.length}`
      );
    }

    return metaEvidenceLogs[0].args._metaEvidenceID;
  };

  const createTransaction = async () => {
    setError(undefined);
    setIsCreating(true);

    if (!client) {
      setError("No blockchain client found");
      setIsCreating(false);
      return;
    }

    if (!contractAddress) {
      setError("No contract address found for current network");
      setIsCreating(false);
      return;
    }

    //Check if the sender has enough balance to cover the transaction amount, if not, we can stop right now
    const userBalance = await getBalance(wagmiConfig, {
      address: senderAddress as `0x${string}`,
      ...(isTokenTransaction ? { token: token.address } : {}),
    });

    if (userBalance.value < formattedAmount) {
      setError("Insufficient balance");
      setIsCreating(false);
      return;
    }

    //Check if the deadline is still in the future, for situations where the user stays in the form long enough for the selected deadline to now be in the past
    if (deadlineDate.getTime() < new Date().getTime()) {
      setError("Deadline is in the past");
      setIsCreating(false);
      return;
    }

    //Once the creation transaction is sent, the escrow may exist even if a later step fails, so asking the user to try again could create a duplicate escrow
    let escrowMayExist = false;

    try {
      const metaEvidenceURI = await handleIPFSUploads();

      let txHash: `0x${string}`;
      if (isTokenTransaction) {
        await handleTokenContractApproval();
        txHash = await handleTokenEscrowCreation(metaEvidenceURI);
      } else {
        txHash = await handleNativeEscrowCreation(metaEvidenceURI);
      }
      escrowMayExist = true;

      const receipt = await waitForTransactionReceipt(client, { hash: txHash });
      if (receipt.status === "reverted") {
        escrowMayExist = false;
        throw new Error("Escrow creation transaction reverted");
      }

      const txID = getEscrowIdFromReceipt(receipt, contractAddress);

      setIsCreating(false);
      resetContext();

      //Navigate to the transaction details page
      navigate(`/transaction/${contractAddress}/${txID}`);
    } catch (error) {
      //Log the error to the console for debugging purposes
      console.error(error);

      if (escrowMayExist) {
        setError(
          "Your escrow was created, but we couldn't open it automatically. You can find it in your transactions."
        );
      } else if (!isUserRejectedRequestError(error)) {
        //Do not show error if user rejected the request
        setError(
          "Please verify your inputs and try again. If the error persists, please reach out via Discord or Telegram."
        );
      }

      setIsCreating(false);
    }
  };

  return {
    isCreating,
    error,
    createTransaction,
  };
}
