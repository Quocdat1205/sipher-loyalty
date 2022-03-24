import { IsEthereumAddress } from "class-validator";

export class etherDto {
  @IsEthereumAddress()
  publicAddress: string;
}
