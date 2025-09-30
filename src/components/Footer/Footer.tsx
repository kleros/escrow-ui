import styled from "styled-components";
import KlerosLinks from "./KlerosLinks/KlerosLinks";

const Container = styled.footer`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? theme.colors.lightBlue
      : theme.colors.primaryPurple};
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;

  p {
    /* dark mode secondary text color */
    color: #becce5;
    font-size: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    justify-content: center;
  }
`;

export default function Footer() {
  return (
    <Container>
      <p>Powered By Kleros</p>
      <KlerosLinks />
    </Container>
  );
}
