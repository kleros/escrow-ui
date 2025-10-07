import { Copiable } from "@kleros/ui-components-library";
import { IconButton } from "../Buttons/IconButton";
import EtherscanIcon from "assets/etherscan.svg?react";
import styled from "styled-components";
import { addressToShortString } from "utils/common";

interface Props {
  address: string;
}

const Container = styled.div`
  display: flex;
  margin-left: -0.5rem;
`;

//NOTE: If in dev and using the Sepolia network, the link will still point to mainnet. This is fine because prod is only available on mainnet, so no need for any logic for dynamic linking.
export default function AddressLinkAndCopy({ address }: Props) {
  return (
    <Container>
      <a
        href={`https://etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton
          small
          icon={<EtherscanIcon />}
          text=""
          customSVGColor={false}
        />
      </a>
      <Copiable copiableContent={address} tooltipProps={{ isDisabled: true }}>
        <h2>{addressToShortString(address)}</h2>
      </Copiable>
    </Container>
  );
}
