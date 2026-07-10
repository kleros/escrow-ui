import { IPFS_GATEWAY_URL } from "config/ipfs";

//CID shape check for CIDv0 and CIDv1 in base32 (the standard's default encoding).
const CID_REGEX = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{50,})([/?#]|$)/;

//Strips the common IPFS URI prefixes, leaving only the CID or CID/path.
const toIpfsPath = (uri: string) =>
  uri
    .trim()
    .replace(/^(?:ipfs:|fs:)\/*/, "")
    .replace(/^\/?(?:ipfs\/)?/, "");

//Resolves a URI to an HTTP URL.
//IPFS URIs in any of their common forms resolve to the configured gateway. Absolute http(s) URLs are returned unchanged.
export const toHttpUrl = (uri: string | null | undefined) => {
  if (typeof uri !== "string" || uri.trim() === "") return undefined;
  if (/^https?:\/\//.test(uri.trim())) return uri.trim();
  return `${IPFS_GATEWAY_URL}/ipfs/${toIpfsPath(uri)}`;
};

//Evidence type URIs must be content-addressed.
export const isContentAddressed = (uri: string | null | undefined) =>
  typeof uri === "string" && CID_REGEX.test(toIpfsPath(uri));

//Everything this app fetches from IPFS is evidence-type content, so non-content-addressed URIs are rejected.
export async function ipfsFetch(uri: string): Promise<unknown> {
  try {
    const url = toHttpUrl(uri);
    if (!url || !isContentAddressed(uri)) {
      throw new Error(`URI is not content-addressed: ${uri}`);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`IPFS fetch failed with status ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Failed to fetch IPFS content for uri ${uri}: ${err}`);
    throw err;
  }
}
