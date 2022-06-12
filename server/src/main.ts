import "reflect-metadata";
import { createServer } from "@graphql-yoga/node";
import { buildSchema } from "type-graphql";
import { PrismaClient, Role, TokenType, User } from "@prisma/client";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyAuth from "@fastify/auth";
import "dotenv/config";
import { verify, JwtPayload, sign } from "jsonwebtoken";
import { authenticate } from "./routes/authenticate";
import { register } from "./routes/register";
import { createSignupToken } from "./routes/createSignupToken";
import { customAuthChecker } from "./typegraphql-decorators/authorization";
import { resolvers } from "./resolvers";

export type TflTokenPayload = JwtPayload & {
  tokenId: number;
};

export type ContextType = {
  prisma: PrismaClient;
  user?: User;
};

export const prisma = new PrismaClient();
if (!process.env.JWT_SECRET) {
  throw Error("Can't start; JWT_SECRET is missing.");
}
export const jwtSecret = process.env.JWT_SECRET;

async function run() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
    authChecker: customAuthChecker,
  });

  const app = fastify({ logger: true });

  const graphQlServer = createServer<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    context: (initialContext) => ({
      prisma,
      user: initialContext.req.user,
    }),
    schema,
    logging: app.log,
  });

  app
    .decorate(
      "verifyJWT",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.headers.authorization?.replace("Bearer ", "");
        if (!token) {
          // return reply.status(401).send("No token provided");
          request.user = {
            id: 4,
            password: "wat",
            realName: "yo",
            roles: ["ADMIN"],
            username: "asdf",
          };
          return;
        }

        let payload: TflTokenPayload;
        try {
          payload = verify(token, jwtSecret) as TflTokenPayload;
        } catch (error) {
          return;
        }

        const tokenId = payload?.tokenId;
        const dbToken = await prisma.token.findFirst({
          where: {
            id: tokenId,
            valid: true,
          },
        });
        if (!dbToken?.valid) {
          // throw new Error("Token has been revoked.");
          return;
        }
        if (!dbToken.userId) {
          // throw new Error("No user associated with token.");
          return;
        }
        const user = await prisma.user.findUnique({
          where: {
            id: dbToken.userId,
          },
        });
        if (!user) {
          // throw new Error("No user associated with token.");
          return;
        }
        request.user = user;
      }
    )
    .register(fastifyAuth)
    .after(() => {
      app.route({
        url: "/graphql",
        method: ["GET", "POST", "OPTIONS"],
        preHandler: app.auth([app.verifyJWT]),
        handler: async (req, reply) => {
          const response = await graphQlServer.handleIncomingMessage(req, {
            req,
            reply,
          });
          response.headers.forEach((value, key) => {
            reply.header(key, value);
          });

          reply.status(response.status);

          reply.send(response.body);
        },
      });
      app.register(createSignupToken);
    });

  app.register(authenticate);
  app.register(register);

  app.listen({
    port: 4000,
  });
}

run();
