import { type Transaction, TransactionStatus } from "model/Transaction";
import Pay from "./Pay/Pay";
import styled from "styled-components";
import Reimburse from "./Reimburse/Reimburse";
import Execute from "./Execute/Execute";
import { useState } from "react";
import ErrorAlert from "./Common/ErrorAlert/ErrorAlert";
import RaiseDispute from "./RaiseDispute/RaiseDispute";
import Withdraw from "./Withdraw/Withdraw";
import OngoingDisputeInfo from "./OngoingDisputeInfo/OngoingDisputeInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

interface Props {
  transaction: Transaction;
  isBuyer: boolean;
}

export default function Actions({ transaction, isBuyer }: Props) {
  //For actions that do not have their own modal to show an error
  const [isActionError, setIsActionError] = useState<boolean>(false);

  const currentTime = Date.now() / 1000;
  const isInBufferPeriod =
    currentTime > transaction.deadlineTimestamp &&
    currentTime <= transaction.expiryTimestamp;
  const hasTimedOut = currentTime > transaction.expiryTimestamp;

  //Show pay button to the buyer if:
  //- Legacy timeout: The old frontend used a gigantic timeout value for transactions with no timeout, so those can never be executed. This ensures there's a way to pay these transactions in the new frontend, without going through disputes.
  //- New timeout logic: For transactions created in the new frontend the above is not a problem, so show the pay button if the transaction is not in dispute and not timed out. Note that if in buffer period, the buyer can only pay the full amount.
  const showPayButton =
    isBuyer &&
    transaction.status === TransactionStatus.NoDispute &&
    (transaction.isLegacyTimeout || !hasTimedOut);

  //Only allow payments in full if the transaction is in buffer period, or if the transaction is a legacy transaction without a timeout and is after the deadline.
  const onlyFullPayment =
    isInBufferPeriod ||
    (transaction.isLegacyTimeout && (isInBufferPeriod || hasTimedOut));

  //Show reimburse button to the seller if the transaction is not in dispute, not in buffer period, and not timed out.
  const showReimburseButton =
    !isBuyer &&
    transaction.status === TransactionStatus.NoDispute &&
    !isInBufferPeriod &&
    !hasTimedOut;

  //Show execute transaction button:
  //- Legacy timeout: never, the contract function will always revert.
  //- New timeout logic: if the transaction is not in dispute and has timed out
  const showExecuteTransactionButton =
    !transaction.isLegacyTimeout &&
    transaction.status === TransactionStatus.NoDispute &&
    hasTimedOut;

  //Show raise dispute button if there is no dispute already and the transaction has not timed out
  const showRaiseDisputeButton =
    transaction.status === TransactionStatus.NoDispute && !hasTimedOut;

  //Show deposit arbitration fee button (RaiseDispute component) to the user only if he is the party that needs to deposit the arbitration fee
  const showDepositArbitrationFeeButton =
    (transaction.status === TransactionStatus.WaitingSender && isBuyer) ||
    (transaction.status === TransactionStatus.WaitingReceiver && !isBuyer);

  const depositFeeDeadline =
    transaction.lastInteraction + transaction.arbitrationInfo.feeTimeout;

  //Show withdraw button if the user is the party that is waiting for the other to deposit the arbitration fee
  const showWithdrawButton =
    (transaction.status === TransactionStatus.WaitingSender && !isBuyer) ||
    (transaction.status === TransactionStatus.WaitingReceiver && isBuyer);

  const ongoingDispute =
    transaction.status === TransactionStatus.DisputeCreated;

  return (
    <Container>
      {isActionError && <ErrorAlert />}

      <ActionsContainer>
        {showPayButton && (
          <Pay
            transactionId={transaction.id}
            contractAddress={transaction.arbitrableAddress}
            escrowAmount={Number(transaction.amountInEscrow)}
            ticker={transaction.metaEvidence.token?.ticker ?? "ETH"}
            decimals={Number(transaction.metaEvidence.token?.decimals ?? 18)}
            onlyFullPayment={onlyFullPayment}
          />
        )}

        {showReimburseButton && (
          <Reimburse
            transactionId={transaction.id}
            contractAddress={transaction.arbitrableAddress}
            escrowAmount={Number(transaction.amountInEscrow)}
            ticker={transaction.metaEvidence.token?.ticker ?? "ETH"}
            decimals={Number(transaction.metaEvidence.token?.decimals ?? 18)}
          />
        )}

        {showExecuteTransactionButton && (
          <Execute
            transactionId={transaction.id}
            contractAddress={transaction.arbitrableAddress}
            isNative={transaction.metaEvidence.token?.ticker === "ETH"}
            setIsExecuteError={setIsActionError}
          />
        )}

        {(showRaiseDisputeButton || showDepositArbitrationFeeButton) && (
          <RaiseDispute
            transactionId={transaction.id}
            contractAddress={transaction.arbitrableAddress}
            arbitrationCost={transaction.arbitrationInfo.arbitrationCost}
            isNative={transaction.metaEvidence.token?.ticker === "ETH"}
            isBuyer={isBuyer}
            hasToDepositFee={showDepositArbitrationFeeButton}
            depositFeeDeadline={depositFeeDeadline}
          />
        )}

        {showWithdrawButton && (
          <Withdraw
            transactionId={transaction.id}
            contractAddress={transaction.arbitrableAddress}
            isNative={transaction.metaEvidence.token?.ticker === "ETH"}
            isBuyer={isBuyer}
            depositFeeDeadline={depositFeeDeadline}
            setIsWithdrawError={setIsActionError}
          />
        )}

        {ongoingDispute && (
          <OngoingDisputeInfo disputeId={transaction.disputeId} />
        )}
      </ActionsContainer>
    </Container>
  );
}
