import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema/schema";

// Create your server
const server = createServer({
  schema,
});
// start the server and explore http://localhost:4000/graphql
server.start();
