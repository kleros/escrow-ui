import {
  RulingContainer,
  StyledH1,
} from "../../../Common/StyledElements/StyledElements";
import { Button } from "@kleros/ui-components-library";
import AppealInfo from "../Common/AppealInfo";
import {
  useSimulateMultipleArbitrableTokenTransactionAppeal,
  useSimulateMultipleArbitrableTransactionAppeal,
  useWriteMultipleArbitrableTokenTransactionAppeal,
  useWriteMultipleArbitrableTransactionAppeal,
} from "config/contracts/generated";
import { useMemo, useState } from "react";
import { useAccount, useClient } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "viem/actions";
import { QUERY_KEYS } from "config/queryKeys";
import { isUserRejectedRequestError } from "utils/common";

interface Props {
  transactionId: bigint;
  contractAddress: string;
  isNative: boolean;
  appealCost: bigint;
  appealPeriod: {
    start: number;
    end: number;
  };
  isLoser: boolean;
  setIsAppealError: (isError: boolean) => void;
}

export default function AppealableDisputeInfo({
  transactionId,
  contractAddress,
  isNative,
  appealCost,
  appealPeriod,
  isLoser,
  setIsAppealError,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isAppealing, setIsAppealing] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId],
      value: appealCost,
      account: address, //By default this is the account used, but set it so if the user switches accounts after the component is rendered, the simulation will use the correct account
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, appealCost, address]);

  const { refetch: refetchNativeSimulateData } =
    useSimulateMultipleArbitrableTransactionAppeal({
      ...transactionConfig,
    });

  const { refetch: refetchTokenSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionAppeal({
      ...transactionConfig,
    });

  const { writeContractAsync: appealNativeTransaction } =
    useWriteMultipleArbitrableTransactionAppeal();
  const { writeContractAsync: appealTokenTransaction } =
    useWriteMultipleArbitrableTokenTransactionAppeal();

  const handleAppeal = async () => {
    setIsAppealError(false);

    if (!client) {
      setIsAppealError(true);
      return;
    }

    setIsAppealing(true);
    let hash;

    try {
      if (isNative) {
        const { data: nativeSimulationData } =
          await refetchNativeSimulateData();

        if (nativeSimulationData?.request) {
          hash = await appealNativeTransaction(nativeSimulationData.request);
        } else {
          setIsAppealing(false);
          setIsAppealError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } = await refetchTokenSimulateData();

        if (tokenSimulationData?.request) {
          hash = await appealTokenTransaction(tokenSimulationData.request);
        } else {
          setIsAppealing(false);
          setIsAppealError(true);
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
      setIsAppealing(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsAppealError(true);
      }

      setIsAppealing(false);
    }
  };

  return (
    <RulingContainer>
      <StyledH1>
        {isLoser ? "You lost the dispute." : "Jurors refused to arbitrate."}
      </StyledH1>
      <AppealInfo appealPeriod={appealPeriod} />
      <Button
        small
        text="Appeal"
        isDisabled={isAppealing}
        isLoading={isAppealing}
        onPress={handleAppeal}
      />
    </RulingContainer>
  );
}
