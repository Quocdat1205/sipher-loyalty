export type BatchOrder = {
  to: string;
  batchID: number[];
  amount: number[];
  salt: string;
  deadline?: number;
};

export type Order = {
  to: string;
  batchID: number;
  amount: number;
  salt: string;
  deadline?: number;
};
