import Countdown from "react-countdown";
import { StyledP } from "../../../Common/StyledElements/StyledElements";
import styled from "styled-components";

interface Props {
  isWinner?: boolean;
  appealPeriod: {
    start: number;
    end: number;
  };
}

const CustomStyledP = styled(StyledP)`
  text-align: center;
`;

export default function AppealInfo({ isWinner = false, appealPeriod }: Props) {
  return (
    <>
      <CustomStyledP>
        {isWinner
          ? "The other party can appeal the decision while the ruling is not executed."
          : "You can appeal the decision while the ruling is not executed."}
        <br />
        After the appeal period ends, if the ruling is not appealed, it can be
        executed.
      </CustomStyledP>
      <Countdown
        date={appealPeriod.end * 1000}
        renderer={({ days, hours, minutes, seconds }) => {
          return (
            <StyledP>
              Time left for appeal: {days}d {hours}h {minutes}m {seconds}s
            </StyledP>
          );
        }}
      />
    </>
  );
}
