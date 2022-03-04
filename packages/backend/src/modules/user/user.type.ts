export interface userType {
  address: string;
  email?: string;
  point?: number;
  username_discord?: string;
  createdAt?: Date;
}

export interface publicAddressType {
  publicAddress: string;
}

export interface walletType {
  signature: string;
  publicAddress: string;
}

export interface updateAccount {
  publicAddress: string;
  username: string;
  email: string;
  bio: string;
  attachment: string;
}

export interface newAddress {
  publicAddress: string;
  fullname: string;
  phone: string;
  address: string;
  type: string;
  isDefault: boolean;
}
