import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const cors: CorsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  credentials: true,
};

export default cors;
