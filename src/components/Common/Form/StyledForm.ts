import { Form } from "@kleros/ui-components-library";
import styled, { css } from "styled-components";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  max-width: 80%;
  gap: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const mobileResponsive = css`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 250px;
  }
`;
