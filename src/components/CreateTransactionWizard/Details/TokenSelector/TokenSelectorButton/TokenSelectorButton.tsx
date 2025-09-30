import { mobileResponsive } from "components/Common/Form/StyledForm";
import type { EscrowToken } from "model/EscrowToken";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 242px;

  ${mobileResponsive}
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 3px;
  padding: 9.5px 14px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.whiteBackground};
  color: ${({ theme }) => theme.colors.primaryText};
`;

const DropdownArrow = styled.span`
  border: solid ${({ theme }) => theme.colors.stroke};
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  margin-left: 8px;
`;

const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  height: 20px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

interface Props {
  token: EscrowToken;
  onClick: () => void;
}

export default function TokenSelectorButton({ token, onClick }: Props) {
  return (
    <Container>
      <StyledLabel>Token</StyledLabel>
      <DropdownContainer onClick={onClick}>
        <DropdownContent>
          <img src={token.logo} alt={token.name} width={24} height={24} />
          <p>{token.ticker}</p>
        </DropdownContent>
        <DropdownArrow />
      </DropdownContainer>
    </Container>
  );
}
