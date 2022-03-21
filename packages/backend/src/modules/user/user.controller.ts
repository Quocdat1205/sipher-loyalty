import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

import { bioDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("upload-image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImg(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const result = await this.userService.uploadFile(file);

    return result;
  }

  @Post("update-bio")
  @UseInterceptors(FileInterceptor("file"))
  async uploadBio(@Body() body: bioDto) {
    const { ather_id, bio } = body;

    return this.userService.updateBio(ather_id, bio);
  }
}
