import { Button } from "@kleros/ui-components-library";
import { useQueryClient } from "@tanstack/react-query";
import { StyledModal } from "components/Common/Modal/StyledModal";
import {
  useSimulateMultipleArbitrableTokenTransactionReimburse,
  useSimulateMultipleArbitrableTransactionReimburse,
  useWriteMultipleArbitrableTokenTransactionReimburse,
  useWriteMultipleArbitrableTransactionReimburse,
} from "config/contracts/generated";
import { QUERY_KEYS } from "config/queryKeys";
import { useMemo, useState } from "react";
import { isUserRejectedRequestError } from "utils/common";
import { parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useClient } from "wagmi";
import {
  StyledForm,
  StyledNumberField,
  StyledP,
} from "../Common/StyledElements/StyledElements";
import ErrorAlert from "../Common/ErrorAlert/ErrorAlert";

interface Props {
  transactionId: bigint;
  contractAddress: string;
  escrowAmount: number;
  ticker: string;
  decimals: number;
}

export default function Reimburse({
  transactionId,
  contractAddress,
  escrowAmount,
  ticker,
  decimals,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(escrowAmount);
  const [isReimbursing, setIsReimbursing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId, parseUnits(amount.toString(), decimals)],
      account: address,
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, amount, decimals, address]);

  const { refetch: refetchReimburseNativeSimulateData } =
    useSimulateMultipleArbitrableTransactionReimburse({
      ...transactionConfig,
    });

  const { refetch: refetchReimburseTokenSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionReimburse({
      ...transactionConfig,
    });

  const { writeContractAsync: reimburseNativeTransaction } =
    useWriteMultipleArbitrableTransactionReimburse();
  const { writeContractAsync: reimburseTokenTransaction } =
    useWriteMultipleArbitrableTokenTransactionReimburse();

  const handleReimburse = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsError(false);

    if (!client) {
      setIsError(true);
      return;
    }

    setIsReimbursing(true);
    let hash;

    try {
      if (ticker === "ETH") {
        const { data: nativeSimulationData } =
          await refetchReimburseNativeSimulateData();

        if (nativeSimulationData?.request) {
          hash = await reimburseNativeTransaction(nativeSimulationData.request);
        } else {
          setIsReimbursing(false);
          setIsError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } =
          await refetchReimburseTokenSimulateData();

        if (tokenSimulationData?.request) {
          hash = await reimburseTokenTransaction(tokenSimulationData.request);
        } else {
          setIsReimbursing(false);
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
      setIsReimbursing(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsError(true);
      }

      setIsReimbursing(false);
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

        <StyledP>
          Current amount in escrow: {escrowAmount} {ticker}
        </StyledP>

        <p>
          You can fully or partially reimburse the other party. The amount that
          remains can still be disputed.
        </p>

        <StyledForm onSubmit={handleReimburse}>
          <StyledNumberField
            value={amount}
            onChange={(value) => setAmount(isNaN(value) ? 0 : value)}
            isRequired
            label="Amount to reimburse"
            name="amount"
            placeholder="Amount"
            validate={(value) =>
              value > 0 && value <= escrowAmount
                ? true
                : "Amount must be greater than 0, but not greater than the escrow amount."
            }
            minValue={0}
            showFieldError
            formatOptions={{
              //Prevent automatic rounding of very small amounts
              minimumFractionDigits: 0,
              maximumFractionDigits: 18,
            }}
          />

          <Button
            text="Send"
            small
            isDisabled={isReimbursing}
            isLoading={isReimbursing}
            type="submit"
          />
        </StyledForm>
      </StyledModal>

      <Button small text="Reimburse" onPress={() => setIsOpen(true)} />
    </>
  );
}
