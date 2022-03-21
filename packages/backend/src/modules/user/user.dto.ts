import { IsString } from "class-validator";

export class bioDto {
  @IsString()
  ather_id: string;

  @IsString()
  bio: string;
}
