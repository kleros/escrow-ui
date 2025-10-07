import styled from "styled-components";
import { Button } from "@kleros/ui-components-library";

export const IconButton = styled(Button)<{ customSVGColor?: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  width: 32px;
  height: 32px;

  ${({ customSVGColor = true }) =>
    customSVGColor &&
    `
    path {
      /* dark mode secondary text color */
      fill: #becce5;
    }
  `}

  &:hover {
    opacity: 0.8;
  }
`;
