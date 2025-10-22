import { mainnet, sepolia, type AppKitNetwork } from "@reown/appkit/networks";
import { http, type Transport } from "viem";

export const SUPPORTED_CHAINS: Record<number, AppKitNetwork> = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
};

export const DEFAULT_CHAIN = import.meta.env.PROD ? mainnet.id : sepolia.id;

export const TRANSPORTS: Record<number, Transport> = {
  [mainnet.id]: http(import.meta.env.VITE_ETHEREUM_MAINNET_RPC),
  [sepolia.id]: http(import.meta.env.VITE_ETHEREUM_SEPOLIA_RPC),
};
