import styled from "styled-components";
import { getIpfsUrl } from "utils/ipfs";
import { isSafeUrl } from "utils/urlValidation";
import SafeLink from "components/Common/Display/SafeLink";
import DocIcon from "assets/doc.svg?react";

const StyledP = styled.p`
  font-weight: bold;
  word-break: break-word;
`;

const Description = styled.p`
  word-break: break-word;
  white-space: pre-wrap;
`;

const StyledSafeLink = styled(SafeLink)`
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
  const documentUrl = agreementDocURI
    ? getDocumentUrl(agreementDocURI, useIpfs)
    : undefined;
  const isDocumentUrlSafe = !useIpfs || isSafeUrl(documentUrl);

  return (
    <>
      <StyledP>Terms</StyledP>

      <Description>{description}</Description>

      <StyledSafeLink url={documentUrl} isSafe={isDocumentUrlSafe}>
        <DocIcon />
        <p>Contract details</p>
      </StyledSafeLink>
    </>
  );
}
