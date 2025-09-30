import styled from "styled-components";
import {
  AlertMessage,
  Box,
  CustomTimeline,
} from "@kleros/ui-components-library";
import { useTransactionDetails } from "hooks/useTransactionDetails";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { getIpfsUrl } from "utils/ipfs";
import { DefaultDivider } from "components/Common/Dividers/DefaultDivider";
import { BaseSkeleton } from "components/Common/Skeleton/BaseSkeleton";
import Agreement from "./Agreement/Agreement";
import TitleAndType from "./TitleAndType/TitleAndType";
import Header from "./Header/Header";
import Summary from "./Summary/Summary";
import Actions from "./Actions/Actions";

const StyledSkeleton = styled(BaseSkeleton)`
  height: 100%;
  width: 80%;
  border-radius: ${({ theme }) => theme.radius.boxDefault};
  background-color: ${({ theme }) => theme.colors.mediumBlue};
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: fit-content;
  gap: 16px;
  padding: 8px 16px;
  align-self: center;
`;

const StyledA = styled.a`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};

  &:hover {
    text-decoration: underline;
  }
`;

const TimelinePartyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

type TimelineItems = React.ComponentProps<typeof CustomTimeline>["items"];
interface Props {
  id: bigint;
  contractAddress: `0x${string}`;
}

export default function TransactionDetails({ id, contractAddress }: Props) {
  const { data: transaction, isFetching } = useTransactionDetails({
    id: id,
    contractAddress,
  });

  const { address } = useAccount();

  //This can be simplified if the CustomTimeline component is updated and no longer expects a tuple or exports the ICustomTimelineProps interface
  const timelineItems = useMemo<TimelineItems>(() => {
    if (!transaction) {
      return [
        {
          title: "No timeline available",
          subtitle: "",
          party: "",
        },
      ];
    }

    const items = transaction.timeline.map((event) => ({
      title: event.title,
      subtitle: event.date,
      party: (
        <TimelinePartyContainer>
          <StyledA href={event.txURL} target="_blank" rel="noopener noreferrer">
            View transaction
          </StyledA>

          {event.evidenceURI && (
            <>
              <StyledSpan>|</StyledSpan>
              <StyledA
                href={getIpfsUrl(event.evidenceURI)}
                target="_blank"
                rel="noopener noreferrer"
              >
                View evidence
              </StyledA>
            </>
          )}
        </TimelinePartyContainer>
      ),
    }));

    return [...items] as TimelineItems;
  }, [transaction]);

  const shouldShowActions = useMemo(() => {
    //Only show actions if the user is a party and the transaction is not completed
    //Use lowercase for comparisons to account for situations where users copy addresses not checksummed
    return (
      transaction &&
      (transaction.metaEvidence.sender.toLowerCase() ===
        address?.toLowerCase() ||
        transaction.metaEvidence.receiver.toLowerCase() ===
          address?.toLowerCase()) &&
      transaction.formattedStatus !== "Completed"
    );
  }, [transaction, address]);

  if (isFetching) {
    return <StyledSkeleton />;
  }

  if (!transaction) {
    return (
      <AlertMessage
        title="Transaction not found"
        msg="Please try again or connect to the correct network."
        variant="error"
      />
    );
  }

  return (
    <StyledBox>
      <Header
        status={transaction.formattedStatus}
        blockExplorerLink={transaction.blockExplorerLink}
        createdAt={transaction.createdAt}
      />

      <TitleAndType
        escrowType={transaction.metaEvidence.subCategory}
        title={transaction.metaEvidence.title}
      />

      <DefaultDivider />

      <Summary
        originalAmount={transaction.metaEvidence.amount}
        escrowAmount={transaction.amountInEscrow}
        ticker={transaction.metaEvidence.token?.ticker ?? "ETH"}
        sender={transaction.metaEvidence.sender}
        receiver={transaction.metaEvidence.receiver}
        deadline={transaction.metaEvidence.extraData["Due Date (Local Time)"]}
        expiryTime={transaction.expiryTimestamp}
      />

      <DefaultDivider />

      <Agreement
        description={transaction.metaEvidence.description}
        agreementDocURI={transaction.metaEvidence.fileURI}
      />

      <DefaultDivider />

      <CustomTimeline items={timelineItems} />

      {shouldShowActions && (
        <>
          <DefaultDivider />

          <Actions
            transaction={transaction}
            isBuyer={
              transaction.metaEvidence.sender.toLowerCase() ===
              address?.toLowerCase()
            }
          />
        </>
      )}
    </StyledBox>
  );
}
