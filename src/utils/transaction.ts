import {
  metaEvidenceEvent,
  paymentEvent,
  hasToPayFeeEvent,
  rulingEvent,
  disputeEvent,
  appealDecisionEvent,
  evidenceEvent,
  type EvidenceLogs,
  type TimelineEventLogs,
} from "config/contracts/events";
import { formatUnits } from "viem";
import { addressToShortString, getBlockExplorerLink } from "./common";
import { type FormattedTransactionStatus } from "model/Transaction";
import type { Evidence } from "model/Evidence";
import { DisputeRuling } from "model/Dispute";
import { TimelineEventVariant } from "model/TimelineEvent";

export const mapTransactionStatus = (
  backendStatus: string,
  amountInEscrow?: string
): FormattedTransactionStatus => {
  switch (backendStatus) {
    case "Resolved":
      return "Completed";
    case "DisputeCreated":
      return "Disputed";
    case "WaitingSender":
      return "Sender has to deposit arbitration fee";
    case "WaitingReceiver":
      return "Receiver has to deposit arbitration fee";
    case "NoDispute":
      //Check if the transaction has been paid (amount in escrow is 0)
      return amountInEscrow === "0" ? "Completed" : "Pending";
    default:
      return "Unknown";
  }
};

export function formatTimelineEvents(
  timelineEvents: TimelineEventLogs,
  evidenceLogs: EvidenceLogs,
  evidenceContent: Evidence[],
  blockTimestamps: bigint[],
  receiver: string,
  sender: string,
  ticker: string,
  decimals: number,
  chainId: number
) {
  return timelineEvents.map((event, index) => {
    switch (event.eventName) {
      case metaEvidenceEvent.name:
        return {
          title: "Escrow created",
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.Default,
        };
      case paymentEvent.name:
        return {
          title: `${formatUnits(
            event.args._amount as bigint,
            decimals
          )} ${ticker} paid by ${addressToShortString(
            event.args._party as string
          )}`,
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.Payment,
        };
      case hasToPayFeeEvent.name:
        return {
          title: `${
            event.args._party === 0
              ? addressToShortString(sender)
              : addressToShortString(receiver)
          } has to deposit arbitration fee`,
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.ActionRequired,
        };
      case disputeEvent.name:
        return {
          title: `Dispute created`,
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.Dispute,
        };
      case appealDecisionEvent.name:
        return {
          title: "Appealed",
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.Dispute,
        };
      case evidenceEvent.name: {
        const evidenceIndex = evidenceLogs.findIndex(
          (log) => log.transactionHash === event.transactionHash
        );
        const evidence = evidenceContent[evidenceIndex];

        return {
          title: `${addressToShortString(
            event.args._party as string
          )} submitted "${evidence.name}" as evidence`,
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          evidenceURI: evidence.fileURI,
          variant: TimelineEventVariant.Evidence,
        };
      }
      case rulingEvent.name:
        return {
          title: `${DisputeRuling[Number(event.args._ruling)]}`,
          date: new Date(
            parseInt(blockTimestamps[index].toString()) * 1000
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          txURL: getBlockExplorerLink(event.transactionHash, chainId),
          variant: TimelineEventVariant.Ruling,
        };
    }
  });
}

export const formatDeadlineDate = (deadline: Date) => {
  return deadline.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

//This function exists to provide the CustomTimeline component with appropriate HEX colors for events where the defaults are not enough (ActionRequired and Evidence).
//For the others, we can rely on the component behavior by default.
//Note that the colors used here match the theme variables directly, this is just to get the HEX value to pass to the CustomTimeline component instead of the CSS variable name.
export const getFormattedTimelineVariant = (
  themeMode: string,
  variant: TimelineEventVariant
) => {
  switch (variant) {
    case TimelineEventVariant.Payment:
      //The CustomTimeline component is ready to handle "positive" events automatically, provided it receives the "accepted" string
      return "accepted";
    case TimelineEventVariant.ActionRequired:
      //warning
      return themeMode === "dark" ? "#ffc46b" : "#ff9900";
    case TimelineEventVariant.Dispute:
      //The CustomTimeline component is ready to handle "negative" events automatically, provided it receives the "refused" string
      return "refused";
    case TimelineEventVariant.Evidence:
      //primaryPurple
      return themeMode === "dark" ? "#7e1bd4" : "#4d00b4";
    case TimelineEventVariant.Ruling:
      //Same as the payment case
      return "accepted";
    default:
      //The CustomTimeline component handles the default case automatically, we can just return undefined
      return undefined;
  }
};
