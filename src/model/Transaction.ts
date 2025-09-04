import type { ArbitratorInfo } from "./ArbitratorInfo";
import type { MetaEvidence } from "./MetaEvidence";
import type { TimelineEvent } from "./TimelineEvent";

export enum TransactionStatus {
  NoDispute,
  WaitingSender,
  WaitingReceiver,
  DisputeCreated,
  Resolved,
}

export type FormattedTransactionStatus =
  | "Pending"
  | "Completed"
  | "Disputed"
  | "Sender has to deposit arbitration fee"
  | "Receiver has to deposit arbitration fee"
  | "Unknown";

export enum DisputeRuling {
  "Jurors refused to arbitrate",
  "Jurors ruled in favor of the sender",
  "Jurors ruled in favor of the receiver",
}

//This value is used in the old frontend to indicate no timeout, so it is necessary to maintain backwards compatibility.
export const NO_TIMEOUT_VALUE_OLD_FRONTEND = 8640000000000000;

//1 week buffer period in seconds
export const BUFFER_PERIOD_IN_SECONDS = 604800;

interface BaseTransaction {
  id: bigint;
  createdAt: string;
  lastInteraction: number;
  arbitrableAddress: string;
  metaEvidence: MetaEvidence;
  formattedStatus: FormattedTransactionStatus;
}

//Used for cards
export interface TransactionMini extends BaseTransaction {
  userPartyLabel: string;
  otherPartyAddress: string;
}

//Used for detailed view
export interface Transaction extends BaseTransaction {
  arbitratorInfo: ArbitratorInfo;
  amountInEscrow: string;
  disputeId: bigint;
  blockExplorerLink: string;
  timeline: TimelineEvent[];
  status: number;
  isLegacyTimeout: boolean;
  deadlineTimestamp: number;
  expiryTimestamp: number;
}
