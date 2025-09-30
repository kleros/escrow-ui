import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";
import { useCreateTransaction } from "hooks/useCreateTransaction";
import { AlertMessage, Button, Card } from "@kleros/ui-components-library";
import { ButtonContainer } from "../../Common/Form/StyledForm";
import { addressToShortString } from "utils/common";
import { formatDeadlineDate } from "utils/transaction";
import { parseZonedDateTime } from "@internationalized/date";
import Agreement from "components/Transactions/TransactionDetails/Agreement/Agreement";
import TitleAndType from "components/Transactions/TransactionDetails/TitleAndType/TitleAndType";
import { DefaultDivider } from "components/Common/Dividers/DefaultDivider";
import { StyledDisplaySmall } from "components/Common/Form/StyledDisplaySmall";
import { BUFFER_PERIOD_IN_SECONDS } from "model/Transaction";

interface Props {
  back: () => void;
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60%;
  height: fit-content;
  max-height: 100%;
  overflow-y: auto;
  gap: 8px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.boxDefault};
`;

const StyledAlertMessage = styled(AlertMessage)`
  overflow: hidden;
  word-break: break-word;
`;

const StyledButtonContainer = styled(ButtonContainer)`
  align-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-items: center;
    flex-direction: column;
  }
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  justify-items: center;
`;

export default function Preview({ back }: Props) {
  const {
    agreementFile,
    amount,
    deadline,
    description,
    escrowType,
    receiverAddress,
    senderAddress,
    title,
    token,
  } = useNewTransactionContext();
  const { isCreating, error, createTransaction } = useCreateTransaction();

  const [tempFileUrl, setTempFileUrl] = useState<string | undefined>();

  //Clean up the URL when component unmounts
  //See https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static#memory_management
  useEffect(() => {
    const url = agreementFile ? URL.createObjectURL(agreementFile) : undefined;
    setTempFileUrl(url);

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [agreementFile]);

  return (
    <StyledCard>
      {error && (
        <StyledAlertMessage
          title="Error creating transaction"
          msg={error}
          variant="error"
        />
      )}

      <TitleAndType escrowType={escrowType} title={title} />

      <DefaultDivider />

      <SummaryContainer>
        <StyledDisplaySmall
          label="Amount"
          text={`${amount} ${token.ticker}`}
          Icon={() => <></>}
        />

        <StyledDisplaySmall
          label="Sender"
          text={addressToShortString(senderAddress)}
          Icon={() => <></>}
        />

        <StyledDisplaySmall
          label="Receiver"
          text={addressToShortString(receiverAddress)}
          Icon={() => <></>}
        />

        <StyledDisplaySmall
          label="Delivery deadline (UTC)"
          text={formatDeadlineDate(parseZonedDateTime(deadline).toDate())}
          Icon={() => <></>}
        />

        <StyledDisplaySmall
          label="Estimated escrow expiry (UTC)"
          text={formatDeadlineDate(
            parseZonedDateTime(deadline)
              .add({ seconds: BUFFER_PERIOD_IN_SECONDS })
              .toDate()
          )}
          Icon={() => <></>}
        />
      </SummaryContainer>

      <DefaultDivider />

      <Agreement
        description={description}
        agreementDocURI={tempFileUrl}
        useIpfs={false}
      />

      <StyledButtonContainer>
        <Button
          small
          text="Back"
          onPress={back}
          isLoading={isCreating}
          isDisabled={isCreating}
        />
        <Button
          small
          text="Create escrow"
          onPress={() => createTransaction()}
          isLoading={isCreating}
          isDisabled={isCreating}
        />
      </StyledButtonContainer>
    </StyledCard>
  );
}
