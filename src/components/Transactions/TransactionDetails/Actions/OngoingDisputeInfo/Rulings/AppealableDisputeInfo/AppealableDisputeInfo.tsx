import {
  RulingContainer,
  StyledH1,
} from "../../../Common/StyledElements/StyledElements";
import { Button } from "@kleros/ui-components-library";
import AppealInfo from "../Common/AppealInfo";

interface Props {
  appealCost: bigint;
  appealPeriod: {
    start: number;
    end: number;
  };
  isLoser: boolean;
}

export default function AppealableDisputeInfo({
  appealCost,
  appealPeriod,
  isLoser,
}: Props) {
  return (
    <RulingContainer>
      <StyledH1>
        {isLoser ? "You lost the dispute." : "Jurors refused to arbitrate."}
      </StyledH1>
      <AppealInfo appealPeriod={appealPeriod} />
      <Button
        small
        text="Appeal"
        onPress={() => {
          console.log("## Appeal Cost: ", appealCost);
        }}
      />
    </RulingContainer>
  );
}
