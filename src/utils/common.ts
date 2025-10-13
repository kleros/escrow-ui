import { MULTIPLE_ARBITRABLE_TRANSACTION_ABI } from "config/contracts/abi/multipleArbitrableTransaction";
import { MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI } from "config/contracts/abi/mutlipleArbitrableTokenTransaction";
import { MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS } from "config/contracts/addresses";
import { BaseError, type Client } from "viem";
import { getBlock } from "viem/actions";

export function addressToShortString(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getBlockExplorerLink(txHash: string, chainId: number) {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${txHash}`;
    case 11155111:
      return `https://sepolia.etherscan.io/tx/${txHash}`;
    default:
      return `https://etherscan.io/tx/${txHash}`;
  }
}

const HELPER_ADDRESSES = Object.values(
  MULTIPLE_ARBITRABLE_TRANSACTION_ADDRESS
).flatMap(Object.values);

export function addressToAbi(address: `0x${string}`) {
  const exists = HELPER_ADDRESSES.includes(address);
  return exists
    ? MULTIPLE_ARBITRABLE_TRANSACTION_ABI
    : MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI;
}

//Fetch the timestamps for the block numbers, so we can display the transaction date
export async function fetchBlockTimestamps(
  client: Client,
  blockNumbers: bigint[]
) {
  return await Promise.all(
    blockNumbers.map(async (blockNumber) => {
      const block = await getBlock(client, { blockNumber });
      return block.timestamp;
    })
  );
}

const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/;
export function validateAddress(input: string) {
  return ethAddressPattern.test(input);
}

//Workaround to check if the error is a user rejected request error, as it is known that viem's UserRejectedRequestError does not catch this...
export function isUserRejectedRequestError(error: unknown) {
  return (
    error instanceof BaseError &&
    (error as BaseError).shortMessage.includes("User rejected the request")
  );
}
