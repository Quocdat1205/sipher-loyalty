import { viewType } from "@entity";

export interface allMerchType {
  id_transaction: number;
  publicAddress: string;
  tier: string;
  merch_item: string;
  quantity: number;
  quantity_shipped: number;
  isShipped: boolean;
  view: viewType;
}

export interface receiverType {
  id_receiver: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
