import { TokenType } from "@prisma/client";
import { add } from "date-fns";
import { FastifyPluginCallback } from "fastify";
import { sign } from "jsonwebtoken";
import { jwtSecret, prisma, TflTokenPayload } from "../main";
import bcrypt from "bcrypt";

const AUTHENTICATION_TOKEN_EXPIRATION_HOURS: number = 24 * 100;

export const authenticate: FastifyPluginCallback = async (app) =>
  app.post<{
    Body: {
      username: string;
      password: string;
    };
  }>("/authenticate", async (req, reply) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const passwordMatches = await bcrypt.compare(
      password,
      user?.password ?? ""
    );
    if (!user || !passwordMatches) {
      return reply.status(401).send("Invalid username or password");
    }

    const tokenExpiration = add(new Date(), {
      hours: AUTHENTICATION_TOKEN_EXPIRATION_HOURS,
    });

    await prisma.token.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        valid: false,
      },
    });

    const createdToken = await prisma.token.create({
      data: {
        type: TokenType.API,
        expiration: tokenExpiration,
        user: {
          connect: {
            username,
          },
        },
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error(
        "The JWT token could not be signed due to a missing secret."
      );
    }

    const payload: TflTokenPayload = {
      tokenId: createdToken.id,
    };

    const authToken: string = sign(payload, jwtSecret, {
      expiresIn: `${AUTHENTICATION_TOKEN_EXPIRATION_HOURS}h`,
    });

    return reply
      .header("Authorization", `Bearer ${authToken}`)
      .header("Access-Control-Expose-Headers", "authorization")
      .code(200)
      .send("ok");
  });
