import styled from "styled-components";

export const BaseSkeleton = styled.div`
  animation: ${({ theme }) => theme.animations.loading};
  background-color: ${({ theme }) => theme.colors.tintPurple};
`;
