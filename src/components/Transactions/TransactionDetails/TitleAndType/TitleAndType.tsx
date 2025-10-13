import styled from "styled-components";

const TitleContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    text-align: center;
  }
`;

const EscrowType = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryPurple};
  word-break: break-word;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  word-break: break-word;
`;

interface Props {
  escrowType: string;
  title: string;
}

export default function TitleAndType({ escrowType, title }: Props) {
  return (
    <TitleContainer>
      <EscrowType>{escrowType}</EscrowType>
      <Title>{title}</Title>
    </TitleContainer>
  );
}
