export type UserData = {
  userId: string;
  publicAddress: string[];
  currentpublicAddress?: string;
  roles: string[];
};

export enum UserRole {
  LOYALTY_ADMIN_AIRDROP = "loyalty-airdrop-admin",
  LOYALTY_ADMIN_SMARTCONTRACT = "loyalty-smartcontract-admin",
  LOYALTY_ADMIN_LOOTBOX_SPACESHIP = "loyalty-spaceship-lootbox-admin",
  USERS = "Users",
}
