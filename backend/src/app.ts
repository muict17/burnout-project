import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import * as helmet from "fastify-helmet";
import * as multipart from "fastify-multipart";
import * as compress from "fastify-compress";
import * as cors from "fastify-cors";
import * as staticFile from "fastify-static";
import * as path from "path";
import jwt from "./jwt";
import logger from "./logger";
import mongo from "./db";
import routes from "./routes";
import * as socketIO from "socket.io";
import * as urlData from "fastify-url-data";
import authenticateDecorate from "./utils/authentication/verify-token";
import verifyAdminDecorate from "./utils/authentication/verify-admin";
import verifyOwnerDecorate from "./utils/authentication/verify-owner";
const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({});
const io = socketIO(server.server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});
io.on("connection", function(socket) {
  socket.on("join", roomId => {
    socket.join(roomId);
  });
});
export default async () => {
  try {
    const dbDriver = await mongo.client;
    const db = dbDriver.db("burnout");
    server
      .register(helmet, { hidePoweredBy: { setTo: "PHP 4.2.0" } })
      .register(compress, { global: false })
      .register(cors)
      .decorateRequest("logger", logger)
      .decorateRequest("jwt", jwt)
      .decorateRequest("db", db)
      .decorateRequest("io", io)
      .register(staticFile, {
        root: path.join(__dirname, "../images"),
        prefix: "/public/"
      })
      .decorateRequest("mongoPrimaryKey", mongo.objectId)
      .register(urlData)
      .register(multipart)
      .decorateRequest("authenticate", authenticateDecorate)
      .decorateRequest("verifyAdmin", verifyAdminDecorate)
      .decorateRequest("verifyOwner", verifyOwnerDecorate);
  } catch (e) {
    logger.error(e);
  }
  routes.forEach((route: any) => {
    server.route(route);
  });

  server.listen(3000, "0.0.0.0", (err: Error, address) => {
    if (err) throw err;
    logger.info(address);
  });
};
