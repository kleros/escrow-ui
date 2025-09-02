import { Button } from "@kleros/ui-components-library";
import { StyledModal } from "components/Common/Modal/StyledModal";
import { useMemo, useState } from "react";
import { StyledP } from "../Common/StyledElements/StyledElements";
import { formatUnits } from "viem";
import styled from "styled-components";

const StyledButton = styled(Button)`
  align-self: center;
`;

interface Props {
  transactionId: bigint;
  contractAddress: string;
  arbitrationCost: bigint;
}

export default function RaiseDispute({
  transactionId,
  contractAddress,
  arbitrationCost,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const transactionConfig = useMemo(() => {
    return {
      address: contractAddress as `0x${string}`,
      args: [transactionId],
    } as const;
  }, [transactionId, contractAddress]);

  const formattedCost = useMemo(
    () => formatUnits(arbitrationCost, 18),
    [arbitrationCost]
  );

  return (
    <>
      <StyledModal
        width="750px"
        isOpen={isOpen}
        isDismissable
        onOpenChange={() => setIsOpen(false)}
      >
        <StyledP>Arbitration cost: {formattedCost} ETH</StyledP>

        <p>
          By raising a dispute you are petitioning for the full remaining
          balance.
          <br />
          You will need to pay the arbitration cost. This fee is refunded if you
          win the dispute.
          <br />
          The dispute will be evaluated by the Kleros jurors.
        </p>

        <StyledButton
          text="Pay fee"
          small
          onPress={() => {}}
          // isDisabled={isPaying}
          // isLoading={isPaying}
        />
      </StyledModal>

      <Button
        small
        text="Raise dispute"
        variant="tertiary"
        onPress={() => setIsOpen(true)}
      />
    </>
  );
}
