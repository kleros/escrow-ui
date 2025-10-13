import styled from "styled-components";
import { getIpfsUrl } from "utils/ipfs";
import DocIcon from "assets/doc.svg?react";

const StyledP = styled.p`
  font-weight: bold;
  word-break: break-word;
`;

const Description = styled.p`
  word-break: break-word;
  white-space: pre-wrap;
`;

const StyledA = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;

interface Props {
  description: string;
  agreementDocURI?: string;
  useIpfs?: boolean;
}

const getDocumentUrl = (uri: string, useIpfs: boolean) => {
  if (!useIpfs) {
    return uri;
  }

  return getIpfsUrl(uri);
};

export default function Agreement({
  description,
  agreementDocURI,
  useIpfs = true,
}: Props) {
  return (
    <>
      <StyledP>Terms</StyledP>

      <Description>{description}</Description>

      {agreementDocURI && (
        <StyledA
          href={getDocumentUrl(agreementDocURI, useIpfs)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DocIcon />
          <p>Contract details</p>
        </StyledA>
      )}
    </>
  );
}
