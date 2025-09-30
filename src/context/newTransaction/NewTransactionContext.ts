import { createContext } from "react";
import type { EscrowType } from "model/EscrowTemplate";
import type { EscrowToken } from "model/EscrowToken";
import { ETH_TOKEN } from "config/tokens";

interface INewTransactionContext {
  escrowType: EscrowType;
  setEscrowType: (type: EscrowType) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  agreementFile: File | undefined;
  setAgreementFile: (agreementFile: File | undefined) => void;
  senderAddress: string;
  setSenderAddress: (address: string) => void;
  receiverAddress: string;
  setReceiverAddress: (address: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  token: EscrowToken;
  setToken: (token: EscrowToken) => void;
  userAddedTokens: EscrowToken[];
  setUserAddedTokens: (tokens: EscrowToken[]) => void;
  deadline: string;
  setDeadline: (deadline: string) => void;
  resetContext: () => void;
}

export const NewTransactionContext = createContext<INewTransactionContext>({
  escrowType: "Cryptocurrency Transaction",
  setEscrowType: () => {},
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
  agreementFile: undefined,
  setAgreementFile: () => {},
  senderAddress: "",
  setSenderAddress: () => {},
  receiverAddress: "",
  setReceiverAddress: () => {},
  amount: 0,
  setAmount: () => {},
  token: ETH_TOKEN,
  setToken: () => {},
  userAddedTokens: [],
  setUserAddedTokens: () => {},
  deadline: "",
  setDeadline: () => {},
  resetContext: () => {},
});
