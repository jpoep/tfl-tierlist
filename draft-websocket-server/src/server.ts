import express from "express";
import http from "http";
import { AddressInfo, WebSocket } from "ws";
import { teams } from "../teams.json";

type TeamsJson = {
  name: string;
  player: string;
  logo: string;
  pokemon: string[];
}[];

let currentTeams = teams as TeamsJson;

const app = express();
app.use(express.json());

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.send(JSON.stringify(currentTeams), (err) => console.log);
});

app.post("/updateTeams", (req, res) => {
  console.log("Updating teams");
  const newTeams = req.body as TeamsJson;
  currentTeams = newTeams;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(newTeams));
  });
  res.send(newTeams);
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
