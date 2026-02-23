import styled from "styled-components";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import SmartContractWalletWarning from "components/Warnings/SmartContractWalletWarning";
import { Outlet } from "react-router";
import { ToastContainer, type Theme, type ToastPosition } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const TOAST_OPTIONS = {
  position: "top-center" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored" as Theme,
}

export default function Layout() {
  return (
    <Container>
      <SmartContractWalletWarning />
      <ToastContainer {...TOAST_OPTIONS} />
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
}
