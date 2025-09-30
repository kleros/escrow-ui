import { Tag } from "@kleros/ui-components-library";
import styled from "styled-components";

interface Props {
  status: string;
  customWidth?: string;
  forceMaxWidth?: boolean;
}

export const TransactionStatusTag = styled(Tag)<Props>`
  --status-color: ${({ theme, status }) =>
    status === "Completed"
      ? theme.colors.success
      : status === "Disputed"
        ? theme.colors.error
        : theme.colors.warning};

  width: ${({ customWidth = "fit-content" }) => customWidth};
  max-width: ${({ forceMaxWidth = false }) =>
    forceMaxWidth ? "50%" : "unset"};

  pointer-events: none;
  border-color: var(--status-color);

  p {
    font-weight: bold;
    color: var(--status-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    max-width: ${({ forceMaxWidth = false }) =>
      forceMaxWidth ? "100%" : "unset"};
  }
`;
