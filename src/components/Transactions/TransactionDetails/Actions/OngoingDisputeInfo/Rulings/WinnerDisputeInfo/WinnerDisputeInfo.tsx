import {
  RulingContainer,
  StyledH1,
} from "../../../Common/StyledElements/StyledElements";
import AppealInfo from "../Common/AppealInfo";

interface Props {
  appealPeriod: {
    start: number;
    end: number;
  };
  isAwaitingRulingExecution: boolean;
}

export default function WinnerDisputeInfo({
  appealPeriod,
  isAwaitingRulingExecution,
}: Props) {
  return (
    <RulingContainer>
      <StyledH1>Congratulations, you won the dispute!</StyledH1>
      {isAwaitingRulingExecution ? (
        <p>
          The dispute has been resolved and appeal is no longer possible. The
          ruling is awaiting execution.
        </p>
      ) : (
        <AppealInfo isWinner appealPeriod={appealPeriod} />
      )}
    </RulingContainer>
  );
}
