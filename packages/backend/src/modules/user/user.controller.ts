import { Body, Controller, Post } from "@nestjs/common";

import { bioDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("upload-image")
  async uploadImg(file: Express.Multer.File): Promise<{ attachment: string }> {
    return this.userService.uploadFile(file);
  }

  @Post("update-bio")
  async uploadBio(@Body() body: bioDto) {
    const { ather_id, bio } = body;

    return this.userService.updateBio(ather_id, bio);
  }
}
