import styled from "styled-components";
import { Box, Button, Card } from "@kleros/ui-components-library";
import EscrowTypeImage from "assets/escrow-type.png";
import CryptoTransactionImage from "assets/crypto-transaction.png";
import GeneralServiceImage from "assets/general-service.png";
import type { EscrowTemplate } from "model/EscrowTemplate";
import { useState } from "react";
import { useNewTransactionContext } from "context/newTransaction/useNewTransactionContext";

const ESCROW_TEMPLATES: EscrowTemplate[] = [
  {
    id: 0,
    title: "Cryptocurrency Transaction",
    description:
      "Escrow funds to facilitate a crypto transaction.\n" +
      "This is a good option for a safe cross chain swap or OTC trades.",
    court: "Blockchain Non Technical Court",
    image: CryptoTransactionImage,
  },
  {
    id: 1,
    title: "General Service",
    description:
      "Hiring an outside contractor? Use the general escrow to safeguard these transactions.\n" +
      "Use this option to define your own terms for any agreement, from freelancing to P2P commerce.",
    court: "General Court",
    image: GeneralServiceImage,
  },
];

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px;
  width: fit-content;
  max-width: 50%;
  min-width: 500px;
  height: auto;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 80%;
    min-width: unset;
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const StyledCard = styled(Card)<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 150px;
  gap: 4px;
  padding: 4px;
  justify-content: space-around;
  align-items: center;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.tint : "transparent"};
`;

const StyledDescription = styled.p`
  text-align: center;
  white-space: pre-wrap;
`;

const StyledCourt = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
`;

const StyledA = styled.a`
  text-decoration: underline;
`;

interface Props {
  next: () => void;
}

export default function Template({ next }: Props) {
  const { escrowType, setEscrowType } = useNewTransactionContext();
  const [selectedTemplate, setSelectedTemplate] = useState<EscrowTemplate>(
    ESCROW_TEMPLATES.find((template) => template.title === escrowType) ??
      ESCROW_TEMPLATES[0]
  );

  const handleSelectTemplate = (template: EscrowTemplate) => {
    setSelectedTemplate(template);
    setEscrowType(template.title);
  };

  return (
    <StyledBox>
      <img src={EscrowTypeImage} alt="Escrow type" />

      <CardContainer>
        {ESCROW_TEMPLATES.map((template) => (
          <StyledCard
            key={template.title}
            selected={selectedTemplate.id === template.id}
            onClick={() => handleSelectTemplate(template)}
            round
            hover
          >
            <img src={template.image} alt={template.title} width="60%" />
            <h2>{template.title}</h2>
          </StyledCard>
        ))}
      </CardContainer>

      <StyledDescription>{selectedTemplate.description}</StyledDescription>

      <StyledCourt>
        Any disputes that may arise will be resolved in the{" "}
        <StyledA
          href={`https://court.kleros.io/courts`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Kleros {selectedTemplate.court}.
        </StyledA>
      </StyledCourt>

      <Button text="Next" small onPress={next} />
    </StyledBox>
  );
}
