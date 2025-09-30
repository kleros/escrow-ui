import { AlertMessage } from "@kleros/ui-components-library";
import { useAccount } from "wagmi";
import DisplayTransactions from "components/Transactions/DisplayTransactions/DisplayTransactions";
import { DefaultPageContainer } from "components/Common/Containers/DefaultPageContainer";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <DefaultPageContainer>
      {!isConnected ? (
        <AlertMessage
          className="w-fit"
          title="Connect your wallet"
          msg="Please connect your wallet to create and view your transactions."
          variant="info"
        />
      ) : (
        <DisplayTransactions />
      )}
    </DefaultPageContainer>
  );
}
