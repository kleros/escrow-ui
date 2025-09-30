import styled from "styled-components";
import { StyledDisplaySmall } from "components/Common/Form/StyledDisplaySmall";
import { addressToShortString } from "utils/common";
import { formatDeadlineDate } from "utils/transaction";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  justify-items: center;
`;

interface Props {
  originalAmount: string;
  escrowAmount: string;
  ticker: string;
  sender: string;
  receiver: string;
  deadline?: string;
  expiryTime: number;
}

export default function Summary({
  originalAmount,
  escrowAmount,
  ticker,
  sender,
  receiver,
  deadline,
  expiryTime,
}: Props) {
  return (
    <Container>
      <StyledDisplaySmall
        label="Original amount"
        text={`${originalAmount} ${ticker}`}
        Icon={() => <></>}
      />

      <StyledDisplaySmall
        label="Amount in escrow"
        text={`${escrowAmount} ${ticker}`}
        Icon={() => <></>}
      />

      <StyledDisplaySmall
        label="Sender"
        text={addressToShortString(sender)}
        Icon={() => <></>}
      />

      <StyledDisplaySmall
        label="Receiver"
        text={addressToShortString(receiver)}
        Icon={() => <></>}
      />

      {/* Deadline is optional to maintain backwards compatibility with old frontend. */}
      {deadline && (
        <StyledDisplaySmall
          label="Delivery deadline (UTC)"
          text={formatDeadlineDate(new Date(deadline))}
          Icon={() => <></>}
        />
      )}

      <StyledDisplaySmall
        label="Escrow expiry (UTC)"
        text={formatDeadlineDate(new Date(expiryTime * 1000))}
        Icon={() => <></>}
      />
    </Container>
  );
}
