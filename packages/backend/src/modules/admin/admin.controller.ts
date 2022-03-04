import { Controller, Post, Body, Session, Get } from "@nestjs/common"
import { logInDto } from "./admin.dto"
import { sessionType } from "@module/auth/auth.type"
import { AdminService } from "./admin.service"

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post("log-in")
  async LogIn(@Body() body: logInDto, @Session() session: sessionType) {
    session.userId = body.username

    return this.adminService.logIn(body)
  }

  @Get("check-expire")
  async CheckExpireToken(@Session() session: sessionType) {
    if (!session.userId) {
      return false
    }

    return true
  }
}
