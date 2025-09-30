import { createAppKit } from "@reown/appkit/react";
import { type AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS, TRANSPORTS } from "./chains";

if (!import.meta.env.VITE_REOWN_PROJECT_ID) {
  throw new Error("No VITE_REOWN_PROJECT_ID environment variable");
}
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

const networks = Object.values(SUPPORTED_CHAINS) as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

export const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  projectId,
  transports: TRANSPORTS,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  defaultNetwork: SUPPORTED_CHAINS[DEFAULT_CHAIN],
  projectId,
});
