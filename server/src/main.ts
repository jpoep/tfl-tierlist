import "reflect-metadata";
import { createServer } from "@graphql-yoga/node";
import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";

async function run() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  createServer({
    context: {
      prisma: new PrismaClient({}),
    },
    schema,
  }).start();
}

run();
