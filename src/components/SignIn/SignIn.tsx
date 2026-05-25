import styled from "styled-components";
import { AlertMessage, Button } from "@kleros/ui-components-library";
import { useAtlasProvider } from "@kleros/kleros-app";
import { toast } from "react-toastify";
import { isUserRejectedRequestError } from "utils/common";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default function SignIn() {
  const { authoriseUser, isSigningIn } = useAtlasProvider();

  const handleSignIn = async () => {
    try {
      await authoriseUser();
    } catch (error) {
      if (!isUserRejectedRequestError(error)) {
        toast.error("Failed to sign in. Please try again.");
      }
    }
  };

  return (
    <Container>
      <AlertMessage
        title="Sign in required"
        msg="To create a transaction, please sign in with ethereum."
        variant="info"
      />
      <Button
        text="Sign In"
        isLoading={isSigningIn}
        isDisabled={isSigningIn}
        onPress={handleSignIn}
      />
    </Container>
  );
}
