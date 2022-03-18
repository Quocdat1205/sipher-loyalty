import { Body, Controller, Post } from "@nestjs/common";

import { SculptureBalanceDto } from "./sculpture.dto";
import { SculptureService } from "./sculpture.service";

@Controller("sculpture")
export class SculptureController {
  constructor(private sculptureService: SculptureService) {}
}
