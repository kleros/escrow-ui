import { useContext } from "react";
import { NewTransactionContext } from "./NewTransactionContext";

export const useNewTransactionContext = () => {
  const context = useContext(NewTransactionContext);

  if (!context) {
    throw new Error(
      "useNewTransactionContext must be used within a NewTransactionProvider"
    );
  }

  return context;
};
