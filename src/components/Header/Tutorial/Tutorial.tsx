import { IconButton } from "components/Common/Buttons/IconButton";
import InfoCircleFull from "assets/info-circle-full.svg?react";

export default function Tutorial() {
  return (
    <a
      href="https://docs.kleros.io/tutorials/escrow-tutorial"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconButton small icon={<InfoCircleFull />} text="" />
    </a>
  );
}
