import { parseAbiItem, type GetLogsReturnType } from "viem";

export const metaEvidenceEvent = parseAbiItem(
  "event MetaEvidence(uint indexed _metaEvidenceID, string _evidence)"
);
export type MetaEvidenceLogs = GetLogsReturnType<typeof metaEvidenceEvent>;

export const paymentEvent = parseAbiItem(
  "event Payment(uint indexed _transactionID, uint _amount, address _party)"
);
export type PaymentLogs = GetLogsReturnType<typeof paymentEvent>;

export const hasToPayFeeEvent = parseAbiItem(
  "event HasToPayFee(uint indexed _transactionID, uint8 _party)"
);
export type HasToPayFeeLogs = GetLogsReturnType<typeof hasToPayFeeEvent>;

export const disputeEvent = parseAbiItem(
  "event Dispute(address indexed _arbitrator, uint indexed _disputeID, uint _metaEvidenceID, uint _evidenceGroupID)"
);
export type DisputeLogs = GetLogsReturnType<typeof disputeEvent>;

export const appealDecisionEvent = parseAbiItem(
  "event AppealDecision(uint indexed _disputeID, address indexed _arbitrable)"
);
export type AppealDecisionLogs = GetLogsReturnType<typeof appealDecisionEvent>;

export const evidenceEvent = parseAbiItem(
  "event Evidence(address indexed _arbitrator, uint indexed _evidenceGroupID, address indexed _party, string _evidence)"
);
export type EvidenceLogs = GetLogsReturnType<typeof evidenceEvent>;

export const rulingEvent = parseAbiItem(
  "event Ruling(address indexed _arbitrator, uint indexed _disputeID, uint _ruling)"
);
export type RulingLogs = GetLogsReturnType<typeof rulingEvent>;

export const nativeTransactionCreatedEvent = parseAbiItem(
  "event TransactionCreated(uint _transactionID, address indexed _sender, address indexed _receiver, uint _amount)"
);
export type NativeTransactionCreatedLogs = GetLogsReturnType<
  typeof nativeTransactionCreatedEvent
>;

export const tokenTrasactionCreatedEvent = parseAbiItem(
  "event TransactionCreated(uint _transactionID, address indexed _sender, address indexed _receiver, address _token, uint _amount)"
);
export type TokenTrasactionCreatedLogs = GetLogsReturnType<
  typeof tokenTrasactionCreatedEvent
>;

export type TimelineEventLogs =
  | MetaEvidenceLogs
  | PaymentLogs
  | HasToPayFeeLogs
  | DisputeLogs
  | AppealDecisionLogs
  | EvidenceLogs
  | RulingLogs;

export type ContractEventLogs = TimelineEventLogs &
  (NativeTransactionCreatedLogs | TokenTrasactionCreatedLogs);
