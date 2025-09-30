import styled from "styled-components";
import { DisplaySmall } from "@kleros/ui-components-library";

export const StyledDisplaySmall = styled(DisplaySmall)`
  overflow: hidden;
  white-space: nowrap;
  height: fit-content;

  label {
    font-weight: bold;
  }

  div {
    margin-top: 0;
  }
`;
