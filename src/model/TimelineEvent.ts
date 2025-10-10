export enum TimelineEventVariant {
  Default,
  Payment,
  ActionRequired,
  Dispute,
  Evidence,
  Ruling,
}

export interface TimelineEvent {
  title: string;
  date: string;
  txURL: string;
  variant: TimelineEventVariant;
  evidenceURI?: string;
}
