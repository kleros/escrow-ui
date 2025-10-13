import { Network } from "alchemy-sdk";

if (!import.meta.env.VITE_ALCHEMY_API_KEY) {
  throw new Error("No VITE_ALCHEMY_API_KEY environment variable");
}
const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

export const alchemyConfig = (chainId: number) => ({
  apiKey: alchemyApiKey,
  network: chainId === 1 ? Network.ETH_MAINNET : Network.ETH_SEPOLIA,
});
