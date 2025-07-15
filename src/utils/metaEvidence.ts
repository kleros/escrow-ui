import type { EscrowToken } from "model/EscrowToken";
import { NO_TIMEOUT_VALUE, type MetaEvidence } from "model/MetaEvidence";
import { parseZonedDateTime } from "@internationalized/date";
import { ipfsPost } from "./ipfs";

const defaultMetaEvidenceFields = {
  category: "Escrow",
  question: "Which party abided by terms of the contract?",
  rulingOptions: {
    type: "single-select",
    titles: ["Refund Sender", "Pay Receiver"],
    descriptions: [
      "Select to return funds to the Sender",
      "Select to release funds to the Receiver",
    ],
  },
  evidenceDisplayInterfaceURI:
    "/ipfs/QmfPnVdcCjApHdiCC8wAmyg5iR246JvVuQGQjQYgtF8gZU/index.html",
};

interface UploadMetaEvidenceProps {
  agreementFileURI?: string;
  amount: string;
  arbitrableAddress: string;
  description: string;
  deadline: string;
  receiverAddress: string;
  senderAddress: string;
  escrowType: string;
  title: string;
  token: EscrowToken;
}

export async function uploadMetaEvidence({
  agreementFileURI,
  amount,
  arbitrableAddress,
  description,
  deadline,
  receiverAddress,
  senderAddress,
  escrowType,
  title,
  token,
}: UploadMetaEvidenceProps) {
  const metaEvidence: MetaEvidence = {
    ...defaultMetaEvidenceFields,
    arbitrableAddress,
    aliases: {
      [senderAddress]: "sender",
      [receiverAddress]: "receiver",
    },
    amount: amount,
    description: description,
    extraData: {
      "Due Date (Local Time)": parseZonedDateTime(deadline)
        .toDate()
        .toISOString(),
    },
    invoice: false,
    receiver: receiverAddress,
    sender: senderAddress,
    subCategory: escrowType,
    timeout: NO_TIMEOUT_VALUE, //No automatic payments yet
    title: title,
    token: {
      address: token.address,
      decimals: token.decimals,
      name: token.name,
      ticker: token.ticker,
      symbolURI: token.logo,
    },
    ...(agreementFileURI ? { fileURI: agreementFileURI } : {}),
  };

  const metaEvidenceURI = await ipfsPost(
    "metaEvidence.json",
    JSON.stringify(metaEvidence)
  );

  return metaEvidenceURI;
}
