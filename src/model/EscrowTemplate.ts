export type EscrowType = "Cryptocurrency Transaction" | "General Service";

export interface EscrowTemplate {
  id: number;
  title: EscrowType;
  description: string;
  court: string;
  image: string;
}
