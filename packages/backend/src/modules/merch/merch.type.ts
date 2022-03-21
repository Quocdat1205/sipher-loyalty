export interface claimItem {
  publicAddress: string;
  id_merch: string;
}

export interface merch {
  id_merch: string;
  publicAddress: string;
  attachment: string;
  title: string;
  description: string;
  isClaim: boolean;
  promo_code: string;
  createdAt?: Date;
}
