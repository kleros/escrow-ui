import {
  Button,
  Datepicker,
  FileUploader,
  TextArea,
  Tooltip,
} from "@kleros/ui-components-library";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";
import {
  ButtonContainer,
  mobileResponsive,
  StyledForm,
} from "../../Common/Form/StyledForm";
import styled from "styled-components";
import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { IconButton } from "components/Common/Buttons/IconButton";
import InfoCircleOutline from "assets/info-circle-outline.svg?react";

const StyledTextArea = styled(TextArea)`
  width: 500px;

  textarea {
    width: 100%;
  }

  ${mobileResponsive}
`;

const StyledFileUploader = styled(FileUploader)`
  width: 500px;

  small {
    font-size: 14px;
  }

  ${mobileResponsive}
`;

const CustomFormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 500px;

  ${mobileResponsive}
`;

const DeadlineInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const StyledDatepicker = styled(Datepicker)`
  div {
    overflow: hidden;
    width: 500px;

    ${mobileResponsive}
  }
`;

interface Props {
  next: () => void;
  back: () => void;
}

export default function Terms({ next, back }: Props) {
  const {
    agreementFile,
    description,
    setDescription,
    deadline,
    setDeadline,
    setAgreementFile,
  } = useNewTransactionContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    next();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextArea
        value={description}
        onChange={(value) => setDescription(value)}
        label="Description"
        placeholder="Specify the agreement"
        isRequired
        resizeY
        validate={(value) =>
          value.length > 0 ? true : "Description is required"
        }
        showFieldError
      />

      <CustomFormFieldContainer>
        <DeadlineInfoContainer>
          <StyledLabel htmlFor="deadline">
            Delivery deadline (Local time)
          </StyledLabel>

          <Tooltip text="This is the deadline for the delivery of the goods or services. There is a buffer period after this date (approximately 1 week, depending on when the transaction is processed). The exact expiry date will be visible in the transaction details page.">
            <IconButton small icon={<InfoCircleOutline />} text="" />
          </Tooltip>
        </DeadlineInfoContainer>

        <StyledDatepicker
          name="deadline"
          minValue={now(getLocalTimeZone())}
          defaultValue={deadline ? parseZonedDateTime(deadline) : undefined}
          onChange={(value) => setDeadline(value?.toString() ?? "")}
          time
          isRequired
        />
      </CustomFormFieldContainer>

      <CustomFormFieldContainer>
        <StyledLabel htmlFor="agreement">
          Upload an agreement PDF (optional)
        </StyledLabel>
        <StyledFileUploader
          callback={setAgreementFile}
          selectedFile={agreementFile}
          acceptedFileTypes={["application/pdf"]}
          validationFunction={(file) => {
            if (!file || file.type !== "application/pdf") {
              return false;
            }
            return true;
          }}
        />
      </CustomFormFieldContainer>

      <ButtonContainer>
        <Button small text="Back" onPress={back} />
        <Button small text="Next" type="submit" />
      </ButtonContainer>
    </StyledForm>
  );
}
