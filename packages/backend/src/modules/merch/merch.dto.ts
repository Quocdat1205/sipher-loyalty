import { IsEthereumAddress, IsString, IsUUID } from "class-validator";

export class walletAddressDto {
  @IsEthereumAddress()
  wallet_address: string;
}

export class claimMerchDto {
  @IsString()
  wallet_address: string;

  @IsUUID()
  id_merch: string;
}
