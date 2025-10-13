import { Button, NumberField, TextField } from "@kleros/ui-components-library";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";
import styled from "styled-components";
import { validateAddress } from "utils/common";
import {
  ButtonContainer,
  mobileResponsive,
  StyledForm,
} from "../../Common/Form/StyledForm";
import TokenSelector from "./TokenSelector/TokenSelector";

const StyledTextField = styled(TextField)`
  width: 500px;

  ${mobileResponsive}
`;

const AmountAndTokenContainer = styled.div`
  display: flex;
  width: 500px;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 250px;
    align-items: center;
  }
`;

const StyledNumberField = styled(NumberField)`
  width: 242px;

  ${mobileResponsive}
`;

interface Props {
  next: () => void;
  back: () => void;
}

export default function Details({ next, back }: Props) {
  const {
    title,
    setTitle,
    receiverAddress,
    setReceiverAddress,
    amount,
    setAmount,
  } = useNewTransactionContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    next();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField
        value={title}
        onChange={(value) => setTitle(value)}
        isRequired
        label="Title"
        name="title"
        placeholder="Title of the escrow transaction"
        type="text"
        validate={(value) => (value.length > 0 ? true : "Title is required")}
        showFieldError
      />

      <StyledTextField
        value={receiverAddress}
        onChange={(value) => setReceiverAddress(value)}
        isRequired
        label="Receiver"
        name="receiver"
        placeholder="ETH address of the funds receiver"
        type="text"
        maxLength={42}
        autoComplete="off"
        validate={(value) =>
          validateAddress(value) ? true : "Invalid ETH address"
        }
        showFieldError
      />

      <AmountAndTokenContainer>
        <StyledNumberField
          value={amount}
          onChange={(value) => setAmount(value)}
          isRequired
          label="Amount"
          name="amount"
          placeholder="Amount"
          validate={(value) =>
            value > 0 ? true : "Amount must be greater than 0"
          }
          showFieldError
          formatOptions={{
            //Prevent automatic rounding of very small amounts
            minimumFractionDigits: 0,
            maximumFractionDigits: 18,
          }}
        />

        <TokenSelector />
      </AmountAndTokenContainer>

      <ButtonContainer>
        <Button small text="Back" onPress={back} />
        <Button small text="Next" type="submit" />
      </ButtonContainer>
    </StyledForm>
  );
}
