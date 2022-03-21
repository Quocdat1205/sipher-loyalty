import { IsEthereumAddress, IsString, IsUUID } from "class-validator";

export class walletAddressDto {
  @IsEthereumAddress()
  publicAddress: string;
}

export class claimMerchDto {
  @IsString()
  publicAddress: string;

  @IsUUID()
  id_merch: string;
}
