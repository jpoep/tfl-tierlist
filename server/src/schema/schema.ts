import SchemaBuilder, { contextCacheSymbol } from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin, { prismaModelName } from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";


const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.prismaObject("Season", {
  description: "A TFL Season, the root of all information",
  findUnique: (season) => ({ number: season.number }),
  fields: (t) => ({
    number: t.exposeID("number"),
    name: t.exposeString("name", { nullable: true }),
    startDate: t.string({
      resolve: (it) => it.startDate.toISOString(),
    }),
    endDate: t.string({
      resolve: (it) => it.endDate?.toISOString(),
      nullable: true,
    }),
    leagues: t.relation("leagues"),
    tierlist: t.relation("tierlist"),
    pickRules: t.relation("pickRules"),
    scheduleRules: t.relation("scheduleRules"),
    ratingRules: t.relation("ratingRules"),
    clauses: t.relation("clauses"),
  }),
});

builder.prismaObject("League", {
  description: "",
  findUnique: (league) => ({ id: league.id }),
  fields: (t) => ({
    rank: t.exposeInt("rank", {}),
    name: t.exposeString("name", { nullable: true }),
    players: t.relation("players"),
    matches: t.relation("matches"),
  }),
});

builder.prismaObject("Match", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    player1: t.relation("player1"),
    player2: t.relation("player2"),
    date: t.string({
      resolve: (it) => it.date.toISOString(),
    }),
    kills: t.relation("kills"),
    score: t.relation("score"),
    vodLink: t.exposeString("vodLink", { nullable: true }),
    showdownReplayLink: t.exposeString("showdownReplayLink", {
      nullable: true,
    }),
  }),
});
builder.prismaObject("Kill", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    fainter: t.relation("fainter"),
    faintee: t.relation("faintee"),
  }),
});

builder.prismaObject("MatchScore", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    player1Score: t.exposeInt("player1Score", {}),
    player2Score: t.exposeInt("player2Score", {}),
  }),
});

builder.prismaObject("PickRules", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    tiers: t.relation("tiers"),
    picks: t.exposeInt("picks", {}),
  }),
});

builder.prismaObject("ScheduleRules", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    matchTurnus: t.string({
      resolve: (it) => it.matchTurnus.toISOString(),
    }),
    rounds: t.exposeInt("rounds", {}),
    playoffs: t.exposeBoolean("playoffs", {}),
    midSeasonTournament: t.exposeBoolean("midSeasonTournament", {}),
  }),
});

builder.prismaObject("RatingRules", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    scorePerWin: t.exposeInt("scorePerWin", {}),
    scorePerLoss: t.exposeInt("scorePerLoss", {}),
    scorePerDraw: t.exposeInt("scorePerWin", {}),
  }),
});

builder.prismaObject("Clause", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    title: t.exposeString("title", { nullable: true }),
    description: t.exposeString("description", {}),
  }),
});

builder.prismaObject("Pokemon", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
  })
  ,
});

builder.prismaObject("Tier", {
  description: "",
  include: {
    flavorTexts: true,
  },
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    rank: t.exposeInt("rank", {}),
    name: t.exposeString("name", {}),
    flavorTexts: t.stringList({
      resolve: (it) => it.flavorTexts.map((flavorText) => flavorText.text),
    }),
    emptySearchText: t.exposeString("emptySearchtext", { nullable: true }),
    pokemon: t.relation("pokemon"),
  }),
});

builder.prismaObject("Team", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    teamName: t.exposeString("teamName"),
    teamLogo: t.exposeString("teamLogo"),
    playerName: t.relation("person"),
    pokemon: t.relation("pokemon"),
  }),
});

builder.prismaObject("Stats", {
  description: "",
  fields: (t) => ({
    hp: t.exposeInt("hp", {}),
    atk: t.exposeInt("atk", {}),
    def: t.exposeInt("def", {}),
    spatk: t.exposeInt("spatk", {}),
    spdef: t.exposeInt("spdef", {}),
    speed: t.exposeInt("speed", {}),
  }),
});

builder.prismaObject("ParticipatingPlayer", {
  description: "",
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    player: t.relation("player"),
    roster: t.relation("roster"),
  }),
});

builder.prismaObject("ConfiguredPokemon", {
  description: "",
  include: {
    moves: true,
  },
  findUnique: (it) => ({ id: it.id }),
  fields: (t) => ({
    pokemon: t.relation("pokemon"),
    nickname: t.exposeString("nickname", { nullable: true }),
    shiny: t.exposeBoolean("shiny"),
    evs: t.relation("evs"),
    ivs: t.relation("ivs"),
    nature: t.exposeString("nature", {}),
    ability: t.exposeString("ability", {}),
    moves: t.stringList({
      resolve: (it) => it.moves.map((move) => move.name),
    }),
    item: t.exposeString("item", {}),
  }),
});

builder.prismaObject("User", {
  description: "",
  findUnique: (it) => ({ username: it.username }),
  fields: (t) => ({
    username: t.exposeString("username"),
    name: t.exposeString("name"),
  }),
});

builder.queryType({
  fields: (t) => ({
    season: t.prismaField({
      type: "Season",
      args: {
        id: t.arg({
          type: "Int",
          description: "ID",
          required: true,
        }),
      },
      resolve: async (query, root, args, ctx, info) =>
        prisma.season.findUnique({
          ...query,
          rejectOnNotFound: true,
          where: { number: args.id },
        }),
    }),
    seasons: t.prismaField({
      type: ["Season"],
      resolve: async (query, root, args, ctx, info) =>
        prisma.season.findMany({
          ...query,
        }),
    }),
  }),
});

// initDb();

export const schema = builder.toSchema({});
