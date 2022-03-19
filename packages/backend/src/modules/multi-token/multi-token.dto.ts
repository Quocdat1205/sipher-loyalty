import { IsEthereumAddress, IsNotEmpty, IsNumberString } from "class-validator";

export class MultiTokenBalanceDto {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;

  @IsNumberString()
  @IsNotEmpty()
  tokenID: string;
}
