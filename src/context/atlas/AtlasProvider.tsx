import { useConfig } from "wagmi";
import { AtlasProvider as DefaultAtlasProvider, IpfsProduct, SignupProduct } from "@kleros/kleros-app";

if (!import.meta.env.VITE_ATLAS_URI) {
  throw new Error("No VITE_ATLAS_URI environment variable");
}

export const AtlasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wagmiConfig = useConfig();

  return (
    <DefaultAtlasProvider
      config={{
        uri: import.meta.env.VITE_ATLAS_URI,
        signupProduct: SignupProduct.CourtV1,
        ipfsProduct: IpfsProduct.Escrow,
        wagmiConfig,
      }}
    >
      {children}
    </DefaultAtlasProvider>
  );
};
