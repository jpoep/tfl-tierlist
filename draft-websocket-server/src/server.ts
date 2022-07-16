import express from "express";
import http from "http";
import { type AddressInfo, WebSocket } from "ws";
import { teams } from "../teams.json";

type Team = {
  name: string;
  player: string;
  logo: string;
  pokemon: string[];
};

type TeamsJson = Team[];

type SinglePokemonUpdate = {
  name?: string;
  player?: string;
  pokemon: string;
};

export type Response =
  | {
      messageType: "teamsUpdate";
      data: TeamsJson;
    }
  | {
      messageType: "singlePokemon";
      data: SinglePokemonUpdate;
    };

let currentTeams = teams as TeamsJson;

const app = express();
app.use(express.json());

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("New connection, sending initial team");
  ws.send(
    JSON.stringify({
      messageType: "teamsUpdate",
      data: currentTeams,
    } as Response),
    () => console.log
  );
});

app.post("/updateTeams", (req, res) => {
  console.log("Updating teams");
  const newTeams = req.body as TeamsJson;
  currentTeams = newTeams;
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        messageType: "teamsUpdate",
        data: currentTeams,
      } as Response)
    );
  });
  res.send(newTeams);
});

app.post("/removePokemon", (req, res) => {
  console.log("Removing single Pokemon");
  const pokemonUpdate = req.body as SinglePokemonUpdate;
  const updatedTeam = currentTeams.find(
    (it) =>
      it.name.toLowerCase() === pokemonUpdate.name?.toLowerCase() ||
      it.player.toLowerCase() === pokemonUpdate.player?.toLowerCase()
  );
  if (!updatedTeam) {
    return res.sendStatus(400);
  }
  const teamWithRemovedPokemon: Team = {
    ...updatedTeam,
    pokemon: updatedTeam.pokemon.filter((it) => it !== pokemonUpdate.pokemon),
  };
  currentTeams = [
    ...currentTeams.filter((it) => it.name !== updatedTeam.name),
    teamWithRemovedPokemon,
  ];
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        messageType: "teamsUpdate",
        data: currentTeams,
      } as Response)
    );
  });
  res.send(pokemonUpdate);
});

app.post("/updatePokemon", (req, res) => {
  console.log("Updating single Pokemon");
  const pokemonUpdate = req.body as SinglePokemonUpdate;
  const updatedTeam = currentTeams.find(
    (it) =>
      it.name.toLowerCase() === pokemonUpdate.name?.toLowerCase() ||
      it.player.toLowerCase() === pokemonUpdate.player?.toLowerCase()
  );
  if (!updatedTeam) {
    return res.sendStatus(400);
  }
  updatedTeam.pokemon.push(pokemonUpdate.pokemon);
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        messageType: "singlePokemon",
        data: pokemonUpdate,
      } as Response)
    );
  });
  res.send(pokemonUpdate);
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
