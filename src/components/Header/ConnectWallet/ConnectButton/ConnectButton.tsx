import { Button } from "@kleros/ui-components-library";
import { useAppKit, useAppKitState } from "@reown/appkit/react";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { open: isOpen } = useAppKitState();

  return (
    <Button
      isDisabled={isOpen}
      small
      text={"Connect Wallet"}
      onPress={async () => open({ view: "Connect" })}
    />
  );
}
