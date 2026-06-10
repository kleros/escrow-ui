import { Tooltip } from "@kleros/ui-components-library";
import type { ReactNode } from "react";
import styled from "styled-components";

const DisabledLink = styled.span`
  cursor: not-allowed;
  opacity: 0.5;
`;

interface Props {
  url?: string;
  isSafe: boolean;
  className?: string;
  children: ReactNode;
}

//Renders a normal link when the URL is safe. 
//When unsafe, still shows the link exists, but it is disabled with a tooltip explaining.
export default function SafeLink({ url, isSafe, className, children }: Props) {
  if (!url) {
    return null;
  }

  if (isSafe) {
    return (
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Tooltip
      wrapperProps={{ className: "w-fit" }}
      text={`This attachment link was flagged as unsafe and has been disabled: "${url}"`}
    >
      <DisabledLink className={className}>{children}</DisabledLink>
    </Tooltip>
  );
}
