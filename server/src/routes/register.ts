import { TokenType } from "@prisma/client";
import { FastifyPluginCallback } from "fastify";
import { verify } from "jsonwebtoken";
import { jwtSecret, prisma, TflTokenPayload } from "../main";
import bcrypt from "bcrypt";

export const register: FastifyPluginCallback = async (app) =>
  app.route<{
    Body: {
      realName: string;
      username: string;
      password: string;
      signupToken: string;
    };
  }>({
    url: "/register",
    method: ["POST"],
    handler: async (req, reply) => {
      const { realName, username, password } = req.body;

      const tokenPayload = verify(
        req.body.signupToken,
        jwtSecret
      ) as TflTokenPayload;

      const token = await prisma.token.findFirst({
        where: {
          id: tokenPayload.tokenId,
          type: TokenType.SIGNUP,
          valid: true,
        },
      });

      if (!token) {
        return reply.status(401).send("Invalid signup token");
      }

      await prisma.user.create({
        data: {
          username,
          realName,
          password: await bcrypt.hash(password, 10),
        },
      });

      await prisma.token.update({
        where: {
          id: token.id,
        },
        data: {
          valid: false,
        },
      });

      return reply.code(201).send("Created");
    },
  });
