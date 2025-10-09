import { useParams } from "react-router";
import { type Transaction } from "model/Transaction";
import TransactionDetails from "components/Transactions/TransactionDetails/TransactionDetails";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  align-items: center;
  overflow-y: auto;
  padding: 32px 0;
`;

//NOTE: If trying to access this page directly with a Sepolia transaction and no wallet is connected to the network, you will see "Transaction not found".
//This is expected behavior, as the viem client defaults to mainnet. Also, not a problem because prod is only available on mainnet.
export default function Transaction() {
  const { id, contractAddress } = useParams();
  const transactionId = BigInt(id ?? "0");

  return (
    <Container>
      <TransactionDetails
        id={transactionId}
        contractAddress={contractAddress as `0x${string}`}
      />
    </Container>
  );
}
