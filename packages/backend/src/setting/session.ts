import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";

import { LoggerService } from "../modules/logger/logger.service";

import constant from "./constant";

const RedisStore = connectRedis(session);

// Configure redis client
const redisClient = new Redis(
  parseInt(constant.SESSION_PORT, 10),
  constant.SESSION_HOST
);

redisClient.on("error", (err: Error) => {
  LoggerService.log(`Could not establish a connection with redis. ${err}`);
});

const appSession = session({
  name: "userId",
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 6, // 6 hour
    httpOnly: true, // JS front end cannot access the cookie
    secure: constant.NODE_ENV === "production", // process.env.NODE_ENV === 'production' cookie only works in https
    sameSite: "lax",
  },
  secret: constant.SECRET_KEY,
  saveUninitialized: false, // don't save empty sessions, right from the start
  resave: true,
});

export default appSession;
