import styled from "styled-components";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import SmartContractWalletWarning from "components/Warnings/SmartContractWalletWarning";
import { Outlet } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export default function Layout() {
  return (
    <Container>
      <SmartContractWalletWarning />
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
}
