import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "context/theme/CustomThemeProvider";
import { wagmiConfig } from "config/reown";
import { NewTransactionProvider } from "context/newTransaction/NewTransactionProvider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <NewTransactionProvider>{children}</NewTransactionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CustomThemeProvider>
  );
}
