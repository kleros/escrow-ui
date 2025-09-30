import { AlertMessage } from "@kleros/ui-components-library";

export default function ErrorAlert() {
  return (
    <AlertMessage
      title="Error creating transaction"
      msg="Transaction simulation failed. Please verify you have enough funds to pay for gas. If the error persists, please reach out via Discord or Telegram."
      variant="error"
    />
  );
}
