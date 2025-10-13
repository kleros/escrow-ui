import { useState } from "react";
import TokenSelectorModal from "./TokenSelectorModal/TokenSelectorModal";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";
import { getEscrowTokens } from "config/tokens";
import { useAccount } from "wagmi";
import TokenSelectorButton from "./TokenSelectorButton/TokenSelectorButton";
import type { EscrowToken } from "model/EscrowToken";

export default function TokenSelector() {
  const { token, setToken, userAddedTokens, setUserAddedTokens } =
    useNewTransactionContext();
  const { chain } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const escrowTokens = getEscrowTokens(chain?.id ?? 1);
  const allTokens = [...userAddedTokens, ...escrowTokens];

  const handleSelectToken = (token: EscrowToken) => {
    setToken(token);
    setIsModalOpen(false);
  };

  const handleAddToken = (token: EscrowToken) => {
    setUserAddedTokens([...userAddedTokens, token]);
  };

  return (
    <>
      <TokenSelectorButton
        token={
          allTokens.find((item) => item.address === token.address) ??
          allTokens[0]
        }
        onClick={() => setIsModalOpen(true)}
      />

      <TokenSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleSelectToken={handleSelectToken}
        handleAddToken={handleAddToken}
        escrowTokens={allTokens}
      />
    </>
  );
}
