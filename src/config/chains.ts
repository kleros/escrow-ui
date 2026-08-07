import { mainnet, sepolia, type AppKitNetwork } from "@reown/appkit/networks";
import { fallback, http, type Transport } from "viem";

export const SUPPORTED_CHAINS: Record<number, AppKitNetwork> = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
};

export const DEFAULT_CHAIN = import.meta.env.PROD ? mainnet.id : sepolia.id;

const buildTransport = (...rpcUrls: (string | undefined)[]): Transport =>
  fallback(rpcUrls.filter((url) => Boolean(url)).map((url) => http(url)));

export const TRANSPORTS: Record<number, Transport> = {
  [mainnet.id]: buildTransport(
    import.meta.env.VITE_ETHEREUM_MAINNET_RPC,
    import.meta.env.VITE_ETHEREUM_MAINNET_RPC_FALLBACK,
  ),
  [sepolia.id]: buildTransport(
    import.meta.env.VITE_ETHEREUM_SEPOLIA_RPC,
    import.meta.env.VITE_ETHEREUM_SEPOLIA_RPC_FALLBACK,
  ),
};
