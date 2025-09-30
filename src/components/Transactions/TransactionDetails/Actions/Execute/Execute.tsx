import { Button } from "@kleros/ui-components-library";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSimulateMultipleArbitrableTokenTransactionExecuteTransaction,
  useSimulateMultipleArbitrableTransactionExecuteTransaction,
  useWriteMultipleArbitrableTokenTransactionExecuteTransaction,
  useWriteMultipleArbitrableTransactionExecuteTransaction,
} from "config/contracts/generated";
import { QUERY_KEYS } from "config/queryKeys";
import { useMemo, useState } from "react";
import { isUserRejectedRequestError } from "utils/common";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useClient } from "wagmi";

interface Props {
  transactionId: bigint;
  contractAddress: string;
  isNative: boolean;
  setIsExecuteError: (isError: boolean) => void;
}

export default function Execute({
  transactionId,
  contractAddress,
  isNative,
  setIsExecuteError,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId],
      account: address,
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, address]);

  const { refetch: refetchNativeSimulateData } =
    useSimulateMultipleArbitrableTransactionExecuteTransaction({
      ...transactionConfig,
    });

  const { refetch: refetchTokenSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionExecuteTransaction({
      ...transactionConfig,
    });

  const { writeContractAsync: executeNativeTransaction } =
    useWriteMultipleArbitrableTransactionExecuteTransaction();
  const { writeContractAsync: executeTokenTransaction } =
    useWriteMultipleArbitrableTokenTransactionExecuteTransaction();

  const handleExecute = async () => {
    setIsExecuteError(false);

    if (!client) {
      setIsExecuteError(true);
      return;
    }

    setIsExecuting(true);
    let hash;

    try {
      if (isNative) {
        const { data: nativeSimulationData } =
          await refetchNativeSimulateData();

        if (nativeSimulationData?.request) {
          hash = await executeNativeTransaction(nativeSimulationData.request);
        } else {
          setIsExecuting(false);
          setIsExecuteError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } = await refetchTokenSimulateData();

        if (tokenSimulationData?.request) {
          hash = await executeTokenTransaction(tokenSimulationData.request);
        } else {
          setIsExecuting(false);
          setIsExecuteError(true);
          return;
        }
      }

      //Wait for the transaction confirmation before performing the details refresh
      await waitForTransactionReceipt(client, { hash: hash });

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.transactionDetails,
          transactionId.toString(),
          contractAddress,
        ],
      });
      setIsExecuting(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsExecuteError(true);
      }

      setIsExecuting(false);
    }
  };

  return (
    <Button
      small
      text="Execute transaction"
      onPress={handleExecute}
      isDisabled={isExecuting}
      isLoading={isExecuting}
    />
  );
}
