import { User } from "@prisma/client";
import fastify from "fastify";
import { ServerResponse, IncomingMessage, Server } from "http";

declare module "fastify" {
  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    verifyJWT(): void;
  }
  
  interface FastifyRequest {
      user: User
  }
}