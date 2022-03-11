import { IsEnum } from "class-validator";
import constant from "@setting/constant";

export class logInDto {
  @IsEnum({ username: constant.TK_WEB })
  username: string;

  @IsEnum({ password: constant.PW_WEB })
  password: string;
}
