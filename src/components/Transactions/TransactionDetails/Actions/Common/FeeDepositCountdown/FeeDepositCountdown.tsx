import Countdown from "react-countdown";
import { StyledP } from "../StyledElements/StyledElements";

interface Props {
  depositFeeDeadline: number;
}

export default function FeeDepositCoundown({ depositFeeDeadline }: Props) {
  return (
    <StyledP>
      Time left:{" "}
      <Countdown
        date={depositFeeDeadline * 1000}
        renderer={({ days, hours, minutes, seconds }) => {
          return (
            <span>
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          );
        }}
      />
    </StyledP>
  );
}
