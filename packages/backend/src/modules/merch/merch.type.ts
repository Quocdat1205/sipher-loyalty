export interface claimItem {
  wallet_address: string;
  id_merch: string;
}

export interface merch {
  id_merch: string;
  wallet_address: string;
  attachment: string;
  title: string;
  description: string;
  isClaim: boolean;
  promo_code: string;
  createdAt?: Date;
}
