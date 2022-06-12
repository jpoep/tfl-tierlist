import "reflect-metadata";
import { createServer } from "@graphql-yoga/node";
import { resolvers } from "@generated/type-graphql";
import { buildSchema, ForbiddenError } from "type-graphql";
import { prisma, PrismaClient, Role, TokenType, User } from "@prisma/client";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyAuth from "@fastify/auth";
import "dotenv/config";
import { decode, verify, JwtPayload, sign } from "jsonwebtoken";
import { add, isBefore } from "date-fns";
import bcrypt from "bcrypt";

async function run() {
  const prisma = new PrismaClient();
  await prisma.user.delete({
    where: {
      username: "admin"
    }
  }),
  await prisma.user.create({
    data: {
      realName: "Adminjones",
      username: "admin",
      password: await bcrypt.hash("admin", 10),
      roles: ["ADMIN", "INVITER", "PLAYER", "VIEWER"]
    }
  })
}

run();