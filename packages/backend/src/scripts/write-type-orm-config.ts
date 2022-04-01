import fs from "fs";

import { configService } from "../setting/config.typeorm";

(async () =>
  fs.writeFileSync(
    "ormconfig.json",
    JSON.stringify(await configService.getTypeOrmConfig(), null, 2) // last parameter can be changed based on how you want the file indented
  ))();
