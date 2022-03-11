export type BatchOrder = {
  to: string;
  batchID: number[];
  amount: number[];
  salt: string;
};

export type Order = {
  to: string;
  batchID: number;
  amount: number;
  salt: string;
};
