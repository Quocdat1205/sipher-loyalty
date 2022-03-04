import { Body, Controller, Get, Post, Query, Session } from "@nestjs/common"

import { sessionType } from "@modules/auth/auth.type"

import { addressDto, connectDiscordDto, signWalletDto, updateAccountDto } from "./user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("check-expired")
  async checkExpireToken(@Session() session: sessionType) {
    const { userId } = session

    if (!userId) {
      return false
    }

    return true
  }

  @Get("get-nonce")
  async getNonce(@Query() query: addressDto, @Session() session: sessionType) {
    const { publicAddress } = query

    session.userId = publicAddress

    return this.userService.getNounce(publicAddress)
  }

  @Post("sign")
  async signWallet(@Body() body: signWalletDto) {
    const { signature, publicAddress } = body

    return this.userService.signNonce({ signature, publicAddress })
  }

  @Get("get-info")
  async getInfo(@Query() query: addressDto) {
    const { publicAddress } = query

    return this.userService.getInfo(publicAddress)
  }

  @Post("connect-discord")
  async connectDiscord(@Body() body: connectDiscordDto) {
    const { publicAddress, id_discord, name_discord } = body

    return this.userService.intergationDiscord({
      publicAddress,
      id_discord,
      name_discord,
    })
  }

  @Post("update-account")
  async updateAccount(@Body() body: updateAccountDto) {
    const { publicAddress, username, email, bio, attachment } = body

    return this.userService.updateAccount({
      publicAddress,
      username,
      email,
      bio,
      attachment,
    })
  }

  @Get("get-activity")
  async getActiviti(@Query() query: addressDto) {
    const { publicAddress } = query

    return this.userService.getActivities({ publicAddress })
  }

  @Get("get-transaction")
  async getTransaction(@Query() query: addressDto) {
    const { publicAddress } = query

    return this.userService.getTransaction({ publicAddress })
  }
}
