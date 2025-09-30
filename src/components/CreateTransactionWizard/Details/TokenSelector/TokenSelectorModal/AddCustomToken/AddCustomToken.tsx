import { Button, TextField } from "@kleros/ui-components-library";
import { Alchemy } from "alchemy-sdk";
import { alchemyConfig } from "config/alchemy";
import UnknownTokenLogo from "assets/unknowntoken.png";
import type { EscrowToken } from "model/EscrowToken";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { validateAddress } from "utils/common";
import { useAccount } from "wagmi";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  align-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-self: center;
  }
`;

interface Props {
  existingTokens: EscrowToken[];
  onAddToken: (token: EscrowToken) => void;
}

export default function AddCustomToken({ existingTokens, onAddToken }: Props) {
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const { chain } = useAccount();

  const alchemyInstance = useMemo(
    () => chain && new Alchemy(alchemyConfig(chain?.id)),
    [chain]
  );

  const handleSubmit = useCallback(async () => {
    if (
      !alchemyInstance ||
      existingTokens.some((token) => token.address === tokenAddress) //prevent duplicates
    )
      return;

    const tokenMetadata =
      await alchemyInstance.core.getTokenMetadata(tokenAddress);

    const token: EscrowToken = {
      name: tokenMetadata.name ? tokenMetadata.name : "Unknown",
      ticker: tokenMetadata.symbol ? tokenMetadata.symbol : "Unknown",
      address: tokenAddress as `0x${string}`,
      logo: tokenMetadata.logo ?? UnknownTokenLogo,
      decimals: tokenMetadata.decimals ?? 18,
    };

    onAddToken(token);
  }, [alchemyInstance, existingTokens, onAddToken, tokenAddress]);

  return (
    <Container>
      <StyledTextField
        aria-label="Token address"
        placeholder="ERC20 token address"
        value={tokenAddress}
        onChange={(value) => setTokenAddress(value)}
        isRequired
        validate={(value) =>
          validateAddress(value) ? true : "Invalid token address"
        }
        showFieldError
      />

      <StyledButton
        text="Add token"
        isDisabled={!validateAddress(tokenAddress)}
        onPress={handleSubmit}
      />
    </Container>
  );
}
