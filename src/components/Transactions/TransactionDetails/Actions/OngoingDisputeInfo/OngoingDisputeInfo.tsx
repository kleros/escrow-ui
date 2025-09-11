import { useAccount } from "wagmi";
import { StyledP } from "../Common/StyledElements/StyledElements";
import styled from "styled-components";
import { DisputeRuling, DisputeStatus, type DisputeInfo } from "model/Dispute";
import TiedDisputeInfo from "./Rulings/TiedDisputeInfo/TiedDisputeInfo";
import LoserDisputeInfo from "./Rulings/LoserDisputeInfo/LoserDisputeInfo";
import WinnerDisputeInfo from "./Rulings/WinnerDisputeInfo/WinnerDisputeInfo";

interface Props {
  disputeId: bigint;
  disputeInfo: DisputeInfo;
  isBuyer: boolean;
}

const defaultLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

const CustomP = styled(StyledP)`
  text-align: center;
`;

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.secondaryText};
  text-decoration: underline;
`;

export default function OngoingDisputeInfo({
  disputeId,
  disputeInfo,
  isBuyer,
}: Props) {
  const { chainId } = useAccount();

  if (disputeInfo.disputeStatus === DisputeStatus.Waiting) {
    return (
      <CustomP>
        Dispute ongoing.
        <br />
        You can follow the process and upload evidence using the{" "}
        <StyledA
          href={`https://resolve.kleros.io/${chainId}/cases/${disputeId}`}
          {...defaultLinkProps}
        >
          Dispute Resolver.
        </StyledA>
        <br />
        You can also view the case in the{" "}
        <StyledA
          href={`https://court.kleros.io/cases/${disputeId}`}
          {...defaultLinkProps}
        >
          Court.
        </StyledA>
      </CustomP>
    );
  }

  const showTiedInformation =
    disputeInfo.currentRuling === DisputeRuling["Jurors refused to arbitrate"];

  const showLoserInformation =
    (isBuyer &&
      disputeInfo.currentRuling ===
        DisputeRuling["Jurors ruled in favor of the receiver"]) ||
    (!isBuyer &&
      disputeInfo.currentRuling ===
        DisputeRuling["Jurors ruled in favor of the sender"]);

  if (showTiedInformation) {
    return <TiedDisputeInfo />;
  }

  if (showLoserInformation) {
    return <LoserDisputeInfo />;
  }

  return <WinnerDisputeInfo />;
}
