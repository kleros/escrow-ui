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
}

export default function WinnerDisputeInfo({ appealPeriod }: Props) {
  return (
    <RulingContainer>
      <StyledH1>Congratulations, you won the dispute!</StyledH1>
      <AppealInfo isWinner appealPeriod={appealPeriod} />
    </RulingContainer>
  );
}
