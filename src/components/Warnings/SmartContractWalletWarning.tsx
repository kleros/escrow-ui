import { IconButton } from "components/Common/Buttons/IconButton";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCode } from "viem/actions";
import { useAccount, useClient } from "wagmi";
import CloseIcon from "assets/close.svg?react";
import WarningCircleOutline from "assets/warning-circle-outline.svg?react";

const Container = styled.div`
  display: flex;
`;

//This mimics the AlertMessage component from the Kleros UI Components Library.
//If that component is updated to allow for the warning message to be an element instead of a string, we can simplify this component by just using <AlertMessage />
const CustomAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.whiteBackground};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.radius.base};
  color: ${({ theme }) => theme.colors.primaryText};
`;

const StyledWarningCircleOutline = styled(WarningCircleOutline)`
  path {
    fill: ${({ theme }) => theme.colors.warning};
  }
`;

const AlertContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warning};
`;

const StyledSmall = styled.small`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const StyledA = styled.a`
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
`;

const STORAGE_KEY = "@kleros/escrow-v1/alert/smart-contract-wallet-warning";
const EIP7702_PREFIX = "0xef0100";

export default function SmartContractWalletWarning() {
  const client = useClient();
  const { address } = useAccount();
  const [isSmartContractWallet, setIsSmartContractWallet] =
    useState<boolean>(false);
  const [showWarning, setShowWarning] = useLocalStorage<boolean>(
    `${STORAGE_KEY}:${address}`,
    true
  );

  useEffect(() => {
    if (!address || !client) return;

    getCode(client, { address }).then((code) => {
      const formattedCode = code?.toLowerCase();
      const isEIP7702 = formattedCode?.startsWith(EIP7702_PREFIX);

      //Do not show warning for EIP-7702 EOAs.
      setIsSmartContractWallet(!!code && !isEIP7702);
    });
  }, [address, client]);

  if (!showWarning || !isSmartContractWallet) {
    return null;
  }

  return (
    <Container>
      <CustomAlert>
        <StyledWarningCircleOutline width={24} height={24} />

        <AlertContentContainer>
          <StyledH2>Warning</StyledH2>
          <StyledSmall>
            You are using a smart contract wallet. This is not recommended.{" "}
            <StyledA
              href="https://docs.kleros.io/kleros-faq#can-i-use-a-smart-contract-account-to-stake-in-the-court"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more.
            </StyledA>
          </StyledSmall>
        </AlertContentContainer>
      </CustomAlert>

      <StyledIconButton
        small
        icon={<CloseIcon />}
        text=""
        onClick={() => setShowWarning(false)}
      />
    </Container>
  );
}
