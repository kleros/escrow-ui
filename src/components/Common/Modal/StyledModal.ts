import { Modal } from "@kleros/ui-components-library";
import styled from "styled-components";
import { mobileResponsive } from "../Form/StyledForm";

export const StyledModal = styled(Modal)<{ width?: string }>`
  width: ${({ width }) => width ?? "500px"};
  height: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.boxDefault};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 500px;
  }

  ${mobileResponsive}
`;
