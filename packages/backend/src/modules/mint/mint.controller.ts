import { Body, Controller, Get } from "@nestjs/common"

// import { sessionType } from "../auth/auth.type"
import { MintService } from "./mint.service"

@Controller("mint")
export class MintController {
  constructor(private mintService: MintService) {}

  @Get("test")
  async test() {
    return this.mintService.test()
  }
}
