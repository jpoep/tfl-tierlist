import { Role, TokenType, User } from "@prisma/client";
import { FastifyPluginCallback } from "fastify";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret, prisma, TflTokenPayload } from "../main.js";
import bcrypt from "bcrypt";
import { add } from "date-fns";

const { sign, verify } = jsonwebtoken;
const SIGNUP_TOKEN_EXPIRATION_HOURS: number = 24;

export const createSignupToken: FastifyPluginCallback = async (app) =>
  app.route<{
    Request: {
      user: User;
    };
    Reply: {
      signupToken?: string;
      signupUrl?: string;
      reason?: string;
    };
  }>({
    url: "/createSignupToken",
    method: "POST",
    preHandler: app.auth([app.verifyJWT]),
    handler: async (req, reply) => {
      const { user } = req;
      if (!user.roles.includes(Role.INVITER)) {
        return reply.status(403).send({
          reason: "Authenticated user isn't allowed to create invite links",
        });
      }

      const token = await prisma.token.create({
        data: {
          expiration: add(new Date(), {
            hours: SIGNUP_TOKEN_EXPIRATION_HOURS,
          }),
          type: TokenType.SIGNUP,
        },
      });

      const tokenPayload: TflTokenPayload = {
        tokenId: token.id,
      };

      const jwtToken = sign(tokenPayload, jwtSecret, {
        expiresIn: `${SIGNUP_TOKEN_EXPIRATION_HOURS}h`,
      });

      return reply.code(200).send({
        signupToken: jwtToken,
        // signupUrl: `${app.getDefaultRoute()}/register?inviteToken=${jwtToken}` tbd
      });
    },
  });
