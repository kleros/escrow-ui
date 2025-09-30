import { Card, Tag } from "@kleros/ui-components-library";
import { type TransactionMini } from "model/Transaction";
import { Link } from "react-router";
import styled from "styled-components";
import { addressToShortString } from "utils/common";
import { TransactionStatusTag } from "components/Transactions/TransactionStatusTag/TransactionStatusTag";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow: hidden;

  p {
    font-size: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 280px;
`;

const CardEdge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tintPurple};
  padding: 8px;
  height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: 80px;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  flex: 1;
`;

const Title = styled.p`
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Description = styled.p`
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const AmountTag = styled(Tag)`
  pointer-events: none;
  text-transform: capitalize;
  font-weight: bold;
  max-width: 50%;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    max-width: 100%;
  }
`;

interface Props {
  transaction: TransactionMini;
}

export default function TransactionCard({ transaction }: Props) {
  return (
    <Link
      to={`/transaction/${transaction.arbitrableAddress}/${transaction.id}`}
    >
      <StyledCard round hover className="w-[1/3]">
        <CardEdge>
          <TransactionStatusTag
            active
            status={transaction.formattedStatus}
            text={transaction.formattedStatus}
            forceMaxWidth
          />
          <AmountTag
            active
            text={`${transaction.userPartyLabel}: ${
              transaction.metaEvidence.amount
            } ${transaction.metaEvidence.token?.ticker ?? "ETH"}`}
          />
        </CardEdge>
        <CardBody>
          <Title>{transaction.metaEvidence.title}</Title>
          <Description>{transaction.metaEvidence.description}</Description>
        </CardBody>
        <CardEdge>
          <Tag text={addressToShortString(transaction.otherPartyAddress)} />
          <p>{transaction.createdAt}</p>
        </CardEdge>
      </StyledCard>
    </Link>
  );
}
