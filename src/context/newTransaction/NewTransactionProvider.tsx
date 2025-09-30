import React, { useEffect, useState } from "react";
import { NewTransactionContext } from "./NewTransactionContext";
import type { EscrowType } from "model/EscrowTemplate";
import type { EscrowToken } from "model/EscrowToken";
import { useAccount } from "wagmi";
import { now, getLocalTimeZone } from "@internationalized/date";
import { ETH_TOKEN } from "config/tokens";

//Add 5 minutes to current time to avoid the DatePicker showing an error if the user does not select a deadline, as escrow deadlines cannot be in the past
const getDefaultDeadline = () =>
  now(getLocalTimeZone()).add({ minutes: 5 }).toString();

export const NewTransactionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [escrowType, setEscrowType] = useState<EscrowType>(
    "Cryptocurrency Transaction"
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [agreementFile, setAgreementFile] = useState<File>();
  const [senderAddress, setSenderAddress] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [token, setToken] = useState<EscrowToken>(ETH_TOKEN);
  const [userAddedTokens, setUserAddedTokens] = useState<EscrowToken[]>([]);
  const [deadline, setDeadline] = useState<string>(getDefaultDeadline());
  const { chain, address } = useAccount();

  const resetContext = () => {
    setEscrowType("Cryptocurrency Transaction");
    setTitle("");
    setDescription("");
    setAgreementFile(undefined);
    setSenderAddress(address ?? "");
    setReceiverAddress("");
    setAmount(0);
    setToken(ETH_TOKEN);
    setUserAddedTokens([]);
    setDeadline(getDefaultDeadline());
  };

  useEffect(() => {
    if (address) {
      setSenderAddress(address);
    }
  }, [address]);

  useEffect(() => {
    setUserAddedTokens([]);
  }, [chain?.id]);

  return (
    <NewTransactionContext.Provider
      value={{
        escrowType,
        setEscrowType,
        title,
        setTitle,
        description,
        setDescription,
        agreementFile,
        setAgreementFile,
        senderAddress,
        setSenderAddress,
        receiverAddress,
        setReceiverAddress,
        amount,
        setAmount,
        token,
        setToken,
        userAddedTokens,
        setUserAddedTokens,
        deadline,
        setDeadline,
        resetContext,
      }}
    >
      {children}
    </NewTransactionContext.Provider>
  );
};
