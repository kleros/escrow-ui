import { Steps } from "@kleros/ui-components-library";
import { useState } from "react";
import styled from "styled-components";
import Template from "./Template/Template";
import Details from "./Details/Details";
import Terms from "./Terms/Terms";
import Preview from "./Preview/Preview";

const STEPS = [
  { title: "Escrow type" },
  { title: "Details" },
  { title: "Terms" },
  { title: "Preview" },
];

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-height: ${({ theme }) => theme.breakpoints.md}) {
    height: unset;
  }
`;

const StyledSteps = styled(Steps)`
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
  height: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export default function CreateTransactionWizard() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Container>
      <StyledSteps items={STEPS} currentItemIndex={currentStep} />

      {currentStep === 0 && <Template next={next} />}
      {currentStep === 1 && <Details next={next} back={back} />}
      {currentStep === 2 && <Terms next={next} back={back} />}
      {currentStep === 3 && <Preview back={back} />}
    </Container>
  );
}
