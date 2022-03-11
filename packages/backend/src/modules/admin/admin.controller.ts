import { Body, Controller, Get, Post, Session } from "@nestjs/common";

import { sessionType } from "@modules/auth/auth.type";

import { logInDto } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post("log-in")
  async LogIn(@Body() body: logInDto, @Session() session: sessionType) {
    session.userId = body.username;

    return this.adminService.logIn(body);
  }

  @Get("check-expire")
  async CheckExpireToken(@Session() session: sessionType) {
    if (!session.userId) {
      return false;
    }

    return true;
  }
}
