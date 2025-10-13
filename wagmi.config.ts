import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { MULTIPLE_ARBITRABLE_TRANSACTION_ABI } from "./src/config/contracts/abi/multipleArbitrableTransaction";
import { MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI } from "./src/config/contracts/abi/mutlipleArbitrableTokenTransaction";
import { KLEROS_LIQUID_ABI } from "./src/config/contracts/abi/klerosLiquid";

export default defineConfig({
  out: "src/config/contracts/generated.ts",
  contracts: [
    {
      name: "MultipleArbitrableTransaction",
      abi: MULTIPLE_ARBITRABLE_TRANSACTION_ABI,
    },
    {
      name: "MultipleArbitrableTokenTransaction",
      abi: MULTIPLE_ARBITRABLE_TOKEN_TRANSACTION_ABI,
    },
    {
      name: "KlerosLiquid",
      abi: KLEROS_LIQUID_ABI,
    },
  ],
  plugins: [react()],
});
