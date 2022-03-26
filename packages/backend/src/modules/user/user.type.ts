import { ApiProperty } from "@nestjs/swagger";

export class updateInfo {
  @ApiProperty({ type: String })
  ather_id: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  bio: string;
}
