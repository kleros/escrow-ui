import { Button } from "@kleros/ui-components-library";
import { useQueryClient } from "@tanstack/react-query";
import { StyledModal } from "components/Common/Modal/StyledModal";
import {
  useSimulateMultipleArbitrableTokenTransactionPay,
  useSimulateMultipleArbitrableTransactionPay,
  useWriteMultipleArbitrableTokenTransactionPay,
  useWriteMultipleArbitrableTransactionPay,
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
  onlyFullPayment: boolean;
}

export default function Pay({
  transactionId,
  contractAddress,
  escrowAmount,
  ticker,
  decimals,
  onlyFullPayment,
}: Props) {
  const queryClient = useQueryClient();
  const client = useClient();
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(escrowAmount);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId, parseUnits(amount.toString(), decimals)],
      account: address, //By default this is the account used, but set it so if the user switches accounts after the component is rendered, the simulation will use the correct account
      query: { enabled: false }, //Only simulate when we want
    } as const;
  }, [contractAddress, transactionId, amount, decimals, address]);

  const { refetch: refetchNativeSimulateData } =
    useSimulateMultipleArbitrableTransactionPay({
      ...transactionConfig,
    });

  const { refetch: refetchTokenSimulateData } =
    useSimulateMultipleArbitrableTokenTransactionPay({
      ...transactionConfig,
    });

  const { writeContractAsync: payNativeTransaction } =
    useWriteMultipleArbitrableTransactionPay();
  const { writeContractAsync: payTokenTransaction } =
    useWriteMultipleArbitrableTokenTransactionPay();

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsError(false);

    if (!client) {
      setIsError(true);
      return;
    }

    setIsPaying(true);
    let hash;

    try {
      if (ticker === "ETH") {
        const { data: nativeSimulationData } =
          await refetchNativeSimulateData();

        if (nativeSimulationData?.request) {
          hash = await payNativeTransaction(nativeSimulationData.request);
        } else {
          setIsPaying(false);
          setIsError(true);
          return;
        }
      } else {
        const { data: tokenSimulationData } = await refetchTokenSimulateData();

        if (tokenSimulationData?.request) {
          hash = await payTokenTransaction(tokenSimulationData.request);
        } else {
          setIsPaying(false);
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
      setIsPaying(false);
    } catch (error) {
      console.error(error);

      if (!isUserRejectedRequestError(error)) {
        setIsError(true);
      }

      setIsPaying(false);
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
          {onlyFullPayment
            ? "Pay the full amount and complete the escrow."
            : "If you are happy with the service or good provided, you can pay the total amount and complete the escrow. Otherwise, you can make a partial payment. The amount that remains can still be disputed."}
        </p>

        <StyledForm onSubmit={handlePay}>
          <StyledNumberField
            value={amount}
            onChange={(value) => setAmount(isNaN(value) ? 0 : value)}
            isRequired
            label="Amount to pay"
            name="amount"
            placeholder="Amount"
            validate={(value) =>
              value > 0 && value <= escrowAmount
                ? true
                : "Amount must be greater than 0, but not greater than the escrow amount."
            }
            minValue={0}
            isDisabled={onlyFullPayment}
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
            isDisabled={isPaying}
            isLoading={isPaying}
            type="submit"
          />
        </StyledForm>
      </StyledModal>

      <Button
        small
        text={onlyFullPayment ? "Pay" : "Make a payment"}
        onPress={() => setIsOpen(true)}
      />
    </>
  );
}
