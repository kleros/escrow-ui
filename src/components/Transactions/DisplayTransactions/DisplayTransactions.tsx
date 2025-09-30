import { useTransactions } from "hooks/useTransactions";
import TransactionCard from "../TransactionCard/TransactionCard";
import styled from "styled-components";
import { BaseSkeleton } from "components/Common/Skeleton/BaseSkeleton";
import { useMemo, useState } from "react";
import { Button, Searchbar } from "@kleros/ui-components-library";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledSearchbar = styled(Searchbar)`
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, max(312px, (100% - 16px * 2)/3)), 1fr)
  );
  align-items: center;
  gap: 16px;
`;

const SkeletonCard = styled(BaseSkeleton)`
  border-radius: ${({ theme }) => theme.radius.base};
  height: 200px;
`;

export default function DisplayTransactions() {
  const { data: transactions, isFetching } = useTransactions();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  //Allow users to filter transactions by title or address
  const filteredTransactions = useMemo(() => {
    if (!search) return transactions;

    const searchLower = search.toLowerCase();
    return transactions.filter(
      (transaction) =>
        transaction.metaEvidence.title.toLowerCase().includes(searchLower) ||
        transaction.metaEvidence.sender.toLowerCase().includes(searchLower) ||
        transaction.metaEvidence.receiver.toLowerCase().includes(searchLower)
    );
  }, [transactions, search]);

  return (
    <Container>
      <Header>
        <StyledSearchbar
          aria-label="Search by title or address"
          placeholder="Search by title or address"
          value={search}
          onChange={(value) => setSearch(value)}
        />

        <Button text="Create transaction" onPress={() => navigate("/new")} />
      </Header>

      <CardContainer>
        {isFetching
          ? [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
          : filteredTransactions.map((transaction) => (
              <TransactionCard
                key={`${transaction.id}-${transaction.arbitrableAddress}`}
                transaction={transaction}
              />
            ))}
      </CardContainer>
    </Container>
  );
}
