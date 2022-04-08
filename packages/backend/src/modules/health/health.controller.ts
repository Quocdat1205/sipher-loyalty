import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import constant from "@setting/constant";

@ApiTags("health")
@Controller("health")
class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator
  ) {}

  @Get("server")
  serverCheck() {
    return "ok";
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          "server",
          constant.isProduction
            ? "https://api-dashboard.sipher.gg/api/sipher/loyalty/health/server"
            : `http://localhost:${constant.PORT}/api/sipher/loyalty/health/server`
        ),
      () => this.db.pingCheck("database"),
    ]);
  }
}

export default HealthController;
