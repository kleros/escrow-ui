import { useAccount } from "wagmi";
import { AlertMessage } from "@kleros/ui-components-library";
import { DefaultPageContainer } from "components/Common/Containers/DefaultPageContainer";
import CreateTransactionWizard from "components/CreateTransactionWizard/CreateTransactionWizard";

export default function New() {
  const { isConnected } = useAccount();

  return (
    <DefaultPageContainer>
      {!isConnected ? (
        <AlertMessage
          className="w-fit"
          title="Connect your wallet"
          msg="Please connect your wallet to create transactions."
          variant="info"
        />
      ) : (
        <CreateTransactionWizard />
      )}
    </DefaultPageContainer>
  );
}
