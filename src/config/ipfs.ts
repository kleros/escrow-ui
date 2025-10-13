if (!import.meta.env.VITE_IPFS_UPLOAD_URL) {
  throw new Error("No VITE_IPFS_UPLOAD_URL environment variable");
}

export const IPFS_UPLOAD_URL = import.meta.env.VITE_IPFS_UPLOAD_URL;
export const IPFS_GATEWAY_URL =
  import.meta.env.VITE_IPFS_GATEWAY_URL || "https://ipfs.io";
