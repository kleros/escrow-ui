export interface ArbitrationInfo {
  arbitratorAddress: `0x${string}`;
  arbitratorExtraData: `0x${string}`;
  arbitrationCost: bigint;
  feeTimeout: number;
}
