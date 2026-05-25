import { IPFS_GATEWAY_URL } from "config/ipfs";

export async function ipfsFetch(uri: string): Promise<unknown> {
  try {
    const formattedUri = getIpfsUrl(uri);
    const response = await fetch(formattedUri);

    if (!response.ok) {
      throw new Error(`IPFS fetch failed with status ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Failed to fetch IPFS content for uri ${uri}: ${err}`);
    throw err;
  }
}

export const getIpfsUrl = (url: string) => {
  const formatedIPFSPath = getFormattedPath(url);
  return `${IPFS_GATEWAY_URL}${formatedIPFSPath}`;
};

const getFormattedPath = (url: string) => {
  if (url.startsWith("/ipfs/")) return url;
  else if (url.startsWith("ipfs/")) return "/" + url;
  else if (url.startsWith("ipfs://")) return url.replace("ipfs://", "/ipfs/");
  return url;
};
