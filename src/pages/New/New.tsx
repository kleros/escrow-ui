import { useAccount } from "wagmi";
import { useAtlasProvider } from "@kleros/kleros-app";
import { AlertMessage } from "@kleros/ui-components-library";
import { DefaultPageContainer } from "components/Common/Containers/DefaultPageContainer";
import CreateTransactionWizard from "components/CreateTransactionWizard/CreateTransactionWizard";
import SignIn from "components/SignIn/SignIn";

export default function New() {
  const { isConnected } = useAccount();
  const { isVerified } = useAtlasProvider();

  return (
    <DefaultPageContainer>
      {!isConnected ? (
        <AlertMessage
          className="w-fit"
          title="Connect your wallet"
          msg="Please connect your wallet to create transactions."
          variant="info"
        />
      ) : !isVerified ? (
        <SignIn />
      ) : (
        <CreateTransactionWizard />
      )}
    </DefaultPageContainer>
  );
}
