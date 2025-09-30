import { zeroAddress } from "viem";
import type { EscrowToken } from "model/EscrowToken";
import ETH_LOGO from "assets/eth.png";
import PNK_LOGO from "assets/pnk.png";
import WETH_LOGO from "assets/weth.png";
import USDC_LOGO from "assets/usdc.png";
import USDT_LOGO from "assets/usdt.png";
import DAI_LOGO from "assets/dai.png";
import GNO_LOGO from "assets/gno.png";
import POL_LOGO from "assets/pol.png";
import ARB_LOGO from "assets/arb.png";
import UNI_LOGO from "assets/uni.png";
import AAVE_LOGO from "assets/aave.png";
import LINK_LOGO from "assets/link.png";

export const ETH_TOKEN: EscrowToken = {
  name: "Ethereum",
  ticker: "ETH",
  address: zeroAddress,
  logo: ETH_LOGO,
  decimals: 18,
};

const PNK_TOKEN: EscrowToken = {
  name: "Pinakion",
  ticker: "PNK",
  address: "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d",
  logo: PNK_LOGO,
  decimals: 18,
};

const WETH_TOKEN: EscrowToken = {
  name: "Wrapped Ether",
  ticker: "WETH",
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  logo: WETH_LOGO,
  decimals: 18,
};

const USDC_TOKEN: EscrowToken = {
  name: "USD Coin",
  ticker: "USDC",
  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  logo: USDC_LOGO,
  decimals: 6,
};

const USDT_TOKEN: EscrowToken = {
  name: "Tether USD",
  ticker: "USDT",
  address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  logo: USDT_LOGO,
  decimals: 6,
};

const DAI_TOKEN: EscrowToken = {
  name: "Dai Stablecoin",
  ticker: "DAI",
  address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  logo: DAI_LOGO,
  decimals: 18,
};

const GNO_TOKEN: EscrowToken = {
  name: "Gnosis Token",
  ticker: "GNO",
  address: "0x6810e776880c02933d47db1b9fc05908e5386b96",
  logo: GNO_LOGO,
  decimals: 18,
};

const POL_TOKEN: EscrowToken = {
  name: "Polygon Ecosystem Token",
  ticker: "POL",
  address: "0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6",
  logo: POL_LOGO,
  decimals: 18,
};

const ARB_TOKEN: EscrowToken = {
  name: "Arbitrum",
  ticker: "ARB",
  address: "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
  logo: ARB_LOGO,
  decimals: 18,
};

const UNI_TOKEN: EscrowToken = {
  name: "Uniswap",
  ticker: "UNI",
  address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  logo: UNI_LOGO,
  decimals: 18,
};

const AAVE_TOKEN: EscrowToken = {
  name: "Aave Token",
  ticker: "AAVE",
  address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
  logo: AAVE_LOGO,
  decimals: 18,
};

const LINK_TOKEN: EscrowToken = {
  name: "ChainLink Token",
  ticker: "LINK",
  address: "0x514910771af9ca656af840dff83e8264ecf986ca",
  logo: LINK_LOGO,
  decimals: 18,
};

const PNK_TOKEN_SEPOLIA: EscrowToken = {
  name: "Pinakion",
  ticker: "PNK",
  address: "0xA1eE4D32bdBcA69cdb445D66fAA3804aFFa24bFE",
  logo: PNK_LOGO,
  decimals: 18,
};

export function getEscrowTokens(chainId: number): EscrowToken[] {
  switch (chainId) {
    case 1:
      return [
        ETH_TOKEN,
        PNK_TOKEN,
        WETH_TOKEN,
        USDC_TOKEN,
        USDT_TOKEN,
        DAI_TOKEN,
        GNO_TOKEN,
        POL_TOKEN,
        ARB_TOKEN,
        UNI_TOKEN,
        AAVE_TOKEN,
        LINK_TOKEN,
      ];
    case 11155111:
      return [ETH_TOKEN, PNK_TOKEN_SEPOLIA];
    default:
      return [ETH_TOKEN];
  }
}
