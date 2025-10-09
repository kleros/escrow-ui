import styled from "styled-components";

export const DefaultPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  align-items: center;
  overflow-y: auto;
  padding: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;
