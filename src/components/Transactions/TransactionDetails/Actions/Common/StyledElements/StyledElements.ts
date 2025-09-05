import { Form, NumberField } from "@kleros/ui-components-library";
import styled from "styled-components";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const StyledNumberField = styled(NumberField)`
  width: 100%;
`;

export const StyledP = styled.p`
  font-weight: bold;
  text-align: justify;
`;

export const CustomActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
