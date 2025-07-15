interface Token {
  address: string | null;
  decimals: number | string;
  name: string;
  symbolURI: string;
  ticker: string;
}

interface RulingOptions {
  descriptions: string[];
  titles: string[];
  type: "single-select" | "multiple-select0" | "uint" | "int" | "string";
}

interface ExtraData {
  Address?: string;
  Blockchain?: string;
  "Cryptoasset Description"?: string;
  "Due Date (Local Time)"?: string;
  "Contract Information"?: string;
}

export interface MetaEvidence {
  aliases: Record<string, string>;
  amount: string;
  arbitrableAddress: string;
  category: string;
  description: string;
  evidenceDisplayInterfaceURI: string;
  extraData: ExtraData;
  invoice: boolean;
  question: string;
  receiver: string;
  rulingOptions: RulingOptions;
  sender: string;
  subCategory: string;
  timeout: number;
  token: Token;
  title: string;
  fileURI?: string;
}
