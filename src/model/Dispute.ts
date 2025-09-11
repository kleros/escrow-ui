export interface DisputeInfo {
  disputeStatus: number;
  currentRuling: number;
  appealCost: bigint;
  appealPeriod: {
    start: number;
    end: number;
  };
}

export enum DisputeRuling {
  "Jurors refused to arbitrate",
  "Jurors ruled in favor of the sender",
  "Jurors ruled in favor of the receiver",
}

export enum DisputeStatus {
  Waiting,
  Appealable,
  Solved,
}
