import { MultiTokenBalanceDto } from "@modules/multi-token/multi-token.dto";

export type SculptureType = "neko" | "inu";
export class SculptureBalanceDto {
  address: string;
  sculptureType: SculptureType;
}

export class RedeemShopifyCodeDto {
  address: string;
  tokenId: string;
  amount: number;
  txHash: string;
}
