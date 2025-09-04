import { Button } from "@kleros/ui-components-library";
import { StyledModal } from "components/Common/Modal/StyledModal";
import React, { useMemo, useState } from "react";
import { StyledP } from "../Common/StyledElements/StyledElements";
import { formatUnits } from "viem";
import styled from "styled-components";
import {
  useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver,
  useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeBySender,
  useSimulateMultipleArbitrableTransactionPayArbitrationFeeByReceiver,
  useSimulateMultipleArbitrableTransactionPayArbitrationFeeBySender,
  useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver,
  useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeBySender,
  useWriteMultipleArbitrableTransactionPayArbitrationFeeByReceiver,
  useWriteMultipleArbitrableTransactionPayArbitrationFeeBySender,
} from "config/contracts/generated";
import { useAccount, useClient } from "wagmi";
import ErrorAlert from "../Common/ErrorAlert/ErrorAlert";
import { useQueryClient } from "@tanstack/react-query";
import { isUserRejectedRequestError } from "utils/common";
import { waitForTransactionReceipt } from "viem/actions";
import { QUERY_KEYS } from "config/queryKeys";
import Countdown from "react-countdown";

const StyledButton = styled(Button)`
  align-self: center;
`;

interface Props {
  transactionId: bigint;
  contractAddress: string;
  arbitrationCost: bigint;
  isNative: boolean;
  isBuyer: boolean;
  hasToDepositFee: boolean;
  timeLeftToDepositFee: number;
}

const FeeDepositCoundown = React.memo(
  ({ timeLeftToDepositFee }: { timeLeftToDepositFee: number }) => {
    return (
      <StyledP>
        Time left:{" "}
        <Countdown
          date={timeLeftToDepositFee * 1000}
          renderer={({ days, hours, minutes, seconds }) => {
            return (
              <span>
                {days}d {hours}h {minutes}m {seconds}s
              </span>
            );
          }}
        />
      </StyledP>
    );
  }
);

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export default function RaiseDispute({
  transactionId,
  contractAddress,
  arbitrationCost,
  isNative,
  isBuyer,
  hasToDepositFee,
  timeLeftToDepositFee,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPayingFee, setIsPayingFee] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId],
      value: arbitrationCost,
      account: address, //By default this is the account used, but set it so if the user switches accounts after the component is rendered, the simulation will use the correct account
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, arbitrationCost, address]);

  const formattedCost = useMemo(
    () => formatUnits(arbitrationCost, 18),
    [arbitrationCost]
  );

  const { refetch: refetchNativeSenderSimulateData } =
    useSimulateMultipleArbitrableTransactionPayArbitrationFeeBySender({
      ...transactionConfig,
    });

  const { refetch: refetchTokenSenderSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeBySender({
      ...transactionConfig,
    });

  const { refetch: refetchNativeReceiverSimulateData } =
    useSimulateMultipleArbitrableTransactionPayArbitrationFeeByReceiver({
      ...transactionConfig,
    });

  const { refetch: refetchTokenReceiverSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver({
      ...transactionConfig,
    });

  const { writeContractAsync: nativeSenderPayFee } =
    useWriteMultipleArbitrableTransactionPayArbitrationFeeBySender();
  const { writeContractAsync: tokenSenderPayFee } =
    useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeBySender();
  const { writeContractAsync: nativeReceiverPayFee } =
    useWriteMultipleArbitrableTransactionPayArbitrationFeeByReceiver();
  const { writeContractAsync: tokenReceiverPayFee } =
    useWriteMultipleArbitrableTokenTransactionPayArbitrationFeeByReceiver();

  const handlePayFee = async () => {
    setIsError(false);

    if (!client) {
      setIsError(true);
      return;
    }

    setIsPayingFee(true);
    let hash;

    try {
      if (isNative) {
        const { data: nativeSimulationData } = isBuyer
          ? await refetchNativeSenderSimulateData()
          : await refetchNativeReceiverSimulateData();

        if (nativeSimulationData?.request) {
          hash = isBuyer
            ? await nativeSenderPayFee(nativeSimulationData.request)
            : await nativeReceiverPayFee(nativeSimulationData.request);
        } else {
          setIsPayingFee(false);
          setIsError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } = isBuyer
          ? await refetchTokenSenderSimulateData()
          : await refetchTokenReceiverSimulateData();

        if (tokenSimulationData?.request) {
          hash = isBuyer
            ? await tokenSenderPayFee(tokenSimulationData.request)
            : await tokenReceiverPayFee(tokenSimulationData.request);
        } else {
          setIsPayingFee(false);
          setIsError(true);
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
      setIsOpen(false);
      setIsPayingFee(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsError(true);
      }

      setIsPayingFee(false);
    }
  };

  return (
    <>
      <StyledModal
        width="750px"
        isOpen={isOpen}
        isDismissable
        onOpenChange={() => setIsOpen(false)}
      >
        {isError && <ErrorAlert />}

        <StyledP>Arbitration cost: {formattedCost} ETH</StyledP>

        {hasToDepositFee && (
          <FeeDepositCoundown timeLeftToDepositFee={timeLeftToDepositFee} />
        )}

        {hasToDepositFee ? (
          <p>
            In order to not forfeit the value in escrow, you must deposit the
            arbitration fee. It will be refunded if you win the dispute.
          </p>
        ) : (
          <p>
            By raising a dispute you are petitioning for the full remaining
            balance.
            <br />
            You will need to deposit the arbitration cost. This is refunded if
            you win the dispute.
            <br />
            The dispute will be evaluated by the Kleros jurors.
          </p>
        )}

        <StyledButton
          text="Deposit"
          small
          isDisabled={isPayingFee}
          isLoading={isPayingFee}
          onPress={() => handlePayFee()}
        />
      </StyledModal>

      <ButtonContainer>
        {hasToDepositFee && (
          <FeeDepositCoundown timeLeftToDepositFee={timeLeftToDepositFee} />
        )}

        <Button
          small
          text={hasToDepositFee ? "Deposit arbitration fee" : "Raise dispute"}
          variant="tertiary"
          onPress={() => setIsOpen(true)}
        />
      </ButtonContainer>
    </>
  );
}
