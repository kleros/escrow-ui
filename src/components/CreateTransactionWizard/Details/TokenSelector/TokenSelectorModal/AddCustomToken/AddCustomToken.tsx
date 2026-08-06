import { Button, TextField } from "@kleros/ui-components-library";
import { Alchemy } from "alchemy-sdk";
import { alchemyConfig } from "config/alchemy";
import UnknownTokenLogo from "assets/unknowntoken.png";
import type { EscrowToken } from "model/EscrowToken";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { validateAddress } from "utils/common";
import { isSafeUrl } from "utils/urlValidation";
import { useAccount } from "wagmi";
import { multicall } from "wagmi/actions";
import { wagmiConfig } from "config/reown";
import { erc20Abi } from "viem";
import { BLACKLISTED_TOKENS } from "config/tokens";
import { toast } from "react-toastify";

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

//Fallback for when alchemy fails or knows nothing about the token.
//Defaults to the unknown token logo.
async function fetchOnchainTokenMetadata(
  tokenAddress: `0x${string}`
): Promise<EscrowToken | null> {
  const contract = { abi: erc20Abi, address: tokenAddress } as const;
  const [name, symbol, decimals] = await multicall(wagmiConfig, {
    contracts: [
      { ...contract, functionName: "name" },
      { ...contract, functionName: "symbol" },
      { ...contract, functionName: "decimals" },
    ],
  });

  if (
    name.status === "failure" &&
    symbol.status === "failure" &&
    decimals.status === "failure"
  ) {
    return null;
  }

  return {
    name: name.result ? name.result : "Unknown",
    ticker: symbol.result ? symbol.result : "Unknown",
    address: tokenAddress,
    logo: UnknownTokenLogo,
    decimals: decimals.result ?? 18,
  };
}

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

    if (BLACKLISTED_TOKENS.includes(tokenAddress.toLowerCase())) {
      toast.error("This token is not supported, most likely because it does not follow the ERC20 standard. Please use a different token.")
      return;
    }

    let token: EscrowToken | null = null;
    try {
      const tokenMetadata =
        await alchemyInstance.core.getTokenMetadata(tokenAddress);

      //Means alchemy metadata is missing or incomplete, so we throw an error and try the contract directly.
      if (!tokenMetadata.name || !tokenMetadata.symbol) {
        throw new Error("No token metadata returned by alchemy");
      }

      token = {
        name: tokenMetadata.name ? tokenMetadata.name : "Unknown",
        ticker: tokenMetadata.symbol ? tokenMetadata.symbol : "Unknown",
        address: tokenAddress as `0x${string}`,
        logo: isSafeUrl(tokenMetadata.logo) ? tokenMetadata.logo! : UnknownTokenLogo,
        decimals: tokenMetadata.decimals ?? 18,
      };
    } catch {
      token = await fetchOnchainTokenMetadata(
        tokenAddress as `0x${string}`
      ).catch(() => null);
    }

    if (!token) {
      toast.error(
        "Could not fetch the token information. Please confirm this is an ERC20 token address on the correct network and try again."
      );
      return;
    }

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
