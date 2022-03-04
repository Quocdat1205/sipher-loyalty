import { IsEthereumAddress, IsString } from "class-validator"

export class addressDto {
  @IsEthereumAddress()
  publicAddress: string
}

export class signWalletDto {
  @IsString()
  signature: string

  @IsEthereumAddress()
  publicAddress: string
}

export class connectDiscordDto {
  @IsEthereumAddress()
  publicAddress: string

  @IsString()
  id_discord: number

  @IsString()
  name_discord: string
}

export class updateAccountDto {
  @IsEthereumAddress()
  publicAddress: string

  @IsString()
  username: string

  @IsString()
  email: string

  @IsString()
  bio: string

  @IsString()
  attachment: string
}
