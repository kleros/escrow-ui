import { Button } from "@kleros/ui-components-library";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSimulateMultipleArbitrableTokenTransactionTimeOutByReceiver,
  useSimulateMultipleArbitrableTokenTransactionTimeOutBySender,
  useSimulateMultipleArbitrableTransactionTimeOutByReceiver,
  useSimulateMultipleArbitrableTransactionTimeOutBySender,
  useWriteMultipleArbitrableTokenTransactionTimeOutByReceiver,
  useWriteMultipleArbitrableTokenTransactionTimeOutBySender,
  useWriteMultipleArbitrableTransactionTimeOutByReceiver,
  useWriteMultipleArbitrableTransactionTimeOutBySender,
} from "config/contracts/generated";
import { QUERY_KEYS } from "config/queryKeys";
import { useMemo, useState } from "react";
import { isUserRejectedRequestError } from "utils/common";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useClient } from "wagmi";
import {
  CustomActionButtonContainer,
  StyledP,
} from "../Common/StyledElements/StyledElements";
import FeeDepositCoundown from "../Common/FeeDepositCountdown/FeeDepositCountdown";
import styled from "styled-components";

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  transactionId: bigint;
  contractAddress: string;
  isNative: boolean;
  isBuyer: boolean;
  depositFeeDeadline: number;
  setIsWithdrawError: (isError: boolean) => void;
}

export default function Withdraw({
  transactionId,
  contractAddress,
  isNative,
  isBuyer,
  depositFeeDeadline,
  setIsWithdrawError,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId],
      account: address, //By default this is the account used, but set it so if the user switches accounts after the component is rendered, the simulation will use the correct account
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, address]);

  const currentTime = Date.now() / 1000;
  const canWithdraw = useMemo(() => {
    return currentTime > depositFeeDeadline;
  }, [currentTime, depositFeeDeadline]);

  const { refetch: refetchNativeSenderTimeoutSimulateData } =
    useSimulateMultipleArbitrableTransactionTimeOutBySender({
      ...transactionConfig,
    });

  const { refetch: refetchTokenSenderTimeoutSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionTimeOutBySender({
      ...transactionConfig,
    });

  const { refetch: refetchNativeReceiverTimeoutSimulateData } =
    useSimulateMultipleArbitrableTransactionTimeOutByReceiver({
      ...transactionConfig,
    });

  const { refetch: refetchTokenReceiverTimeoutSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionTimeOutByReceiver({
      ...transactionConfig,
    });

  const { writeContractAsync: nativeSenderTimeout } =
    useWriteMultipleArbitrableTransactionTimeOutBySender();
  const { writeContractAsync: tokenSenderTimeout } =
    useWriteMultipleArbitrableTokenTransactionTimeOutBySender();
  const { writeContractAsync: nativeReceiverTimeout } =
    useWriteMultipleArbitrableTransactionTimeOutByReceiver();
  const { writeContractAsync: tokenReceiverTimeout } =
    useWriteMultipleArbitrableTokenTransactionTimeOutByReceiver();

  const handleWithdraw = async () => {
    setIsWithdrawError(false);

    if (!client) {
      setIsWithdrawError(true);
      return;
    }

    setIsWithdrawing(true);
    let hash;

    try {
      if (isNative) {
        const { data: nativeSimulationData } = isBuyer
          ? await refetchNativeSenderTimeoutSimulateData()
          : await refetchNativeReceiverTimeoutSimulateData();

        if (nativeSimulationData?.request) {
          hash = isBuyer
            ? await nativeSenderTimeout(nativeSimulationData.request)
            : await nativeReceiverTimeout(nativeSimulationData.request);
        } else {
          setIsWithdrawing(false);
          setIsWithdrawError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } = isBuyer
          ? await refetchTokenSenderTimeoutSimulateData()
          : await refetchTokenReceiverTimeoutSimulateData();

        if (tokenSimulationData?.request) {
          hash = isBuyer
            ? await tokenSenderTimeout(tokenSimulationData.request)
            : await tokenReceiverTimeout(tokenSimulationData.request);
        } else {
          setIsWithdrawing(false);
          setIsWithdrawError(true);
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
      setIsWithdrawing(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsWithdrawError(true);
      }

      setIsWithdrawing(false);
    }
  };

  return (
    <CustomActionButtonContainer>
      <StyledInfoContainer>
        {!canWithdraw && (
          <FeeDepositCoundown depositFeeDeadline={depositFeeDeadline} />
        )}

        <StyledP>
          {canWithdraw
            ? "The other party failed to deposit the arbitration fee in time, thus forfeiting the value in escrow. You can now withdraw the funds."
            : "The other party must deposit the arbitration fee in the allowed time frame, otherwise you will be able to withdraw the funds in escrow."}
        </StyledP>
      </StyledInfoContainer>

      <Button
        small
        text="Withdraw"
        onPress={handleWithdraw}
        isDisabled={isWithdrawing || !canWithdraw}
        isLoading={isWithdrawing}
      />
    </CustomActionButtonContainer>
  );
}
