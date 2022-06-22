import { Role } from "@prisma/client";
import {
  ConfiguredPokemonCreateWithoutInRosterOfInput,
  PokemonWhereUniqueInput,
  MoveWhereUniqueInput,
  StatsCreateNestedOneWithoutUsedAsEvsInInput,
  StatsCreateNestedOneWithoutUsedAsIvsInInput,
  ParticipatingPlayer,
  Match,
} from "@generated/type-graphql";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  UnauthorizedError,
} from "type-graphql";
import { ContextType } from "../main";
import { shuffle } from "d3-array";
import { add, differenceInDays } from "date-fns";

type ConfiguredPokemonInput = Omit<
  ConfiguredPokemonCreateWithoutInRosterOfInput,
  "pokemon" | "moves"
> & {
  pokemon: PokemonWhereUniqueInput[];
  moves: MoveWhereUniqueInput[];
};

@InputType()
class ConfiguredPokemonInputClass implements ConfiguredPokemonInput {
  @Field(() => String, { nullable: true })
  nickname?: string | undefined;
  @Field(() => Boolean, { nullable: true })
  shiny?: boolean | undefined;
  @Field(() => StatsCreateNestedOneWithoutUsedAsEvsInInput)
  evs?: StatsCreateNestedOneWithoutUsedAsEvsInInput | undefined;
  @Field(() => StatsCreateNestedOneWithoutUsedAsIvsInInput)
  ivs?: StatsCreateNestedOneWithoutUsedAsIvsInInput | undefined;
  @Field(() => String, { nullable: true })
  nature?: string | undefined;
  @Field(() => String, { nullable: true })
  ability?: string | undefined;
  @Field(() => String, { nullable: true })
  item?: string | undefined;
  @Field(() => [PokemonWhereUniqueInput])
  pokemon!: PokemonWhereUniqueInput[];
  @Field(() => [MoveWhereUniqueInput])
  moves!: MoveWhereUniqueInput[];
}

@InputType()
class RegisterTeamInput {
  @Field()
  matchId!: number;

  @Field(() => [ConfiguredPokemonInputClass])
  roster!: ConfiguredPokemonInputClass[];
}

@InputType()
class Kills {
  @Field()
  fainter!: string;
  @Field()
  faintee!: string;
}

export class MatchResolver {
  @Authorized<Role>(Role.PLAYER, Role.ADMIN)
  @Mutation(() => ParticipatingPlayer)
  async registerTeam(
    @Ctx() { prisma, user }: ContextType,
    @Arg("data") newTeamData: RegisterTeamInput
  ): Promise<ParticipatingPlayer> {
    const { matchId, roster } = newTeamData;
    if (!user) {
      throw new UnauthorizedError();
    }
    const participatingPlayer = await prisma.participatingPlayer.findFirst({
      where: {
        AND: {
          OR: {
            matchupAsPlayer1: {
              id: matchId,
            },
            matchupAsPlayer2: {
              id: matchId,
            },
          },
          player: {
            userId: user.id,
          },
        },
      },
      include: {
        roster: true,
        matchupAsPlayer1: true,
        matchupAsPlayer2: true,
      },
    });
    if (!participatingPlayer) {
      throw new Error("No match found");
    }
    if (
      participatingPlayer.matchupAsPlayer1?.winnerId ||
      participatingPlayer.matchupAsPlayer2?.winnerId
    ) {
      throw new Error("Can't change a team for a finished match.");
    }

    return await prisma.participatingPlayer.update({
      where: {
        id: participatingPlayer.id,
      },
      data: {
        roster: {
          deleteMany: {
            rosterId: {
              equals: participatingPlayer.id,
            },
          },
          create: roster,
        },
      },
    });
  }

  @Authorized<Role>(Role.PLAYER)
  @Mutation(() => [Match])
  async updateResults(
    @Ctx() { prisma, user }: ContextType,
    @Arg("matchId") matchId: number,
    @Arg("kills", () => [Kills]) kills: Kills[],
    @Arg("winnerId", { nullable: true }) winnerId: number
  ): Promise<Match> {
    if (!user) {
      throw new UnauthorizedError();
    }
    const match = await prisma.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        player1: { include: { roster: true } },
        player2: { include: { roster: true } },
      },
    });

    if (!match) {
      throw new Error("No match found");
    }

    const { player1, player2 } = match;
    const team1 = player1.roster.map((it) => it.pokemonId);
    const team2 = player2.roster.map((it) => it.pokemonId);

    kills.forEach((kill) => {
      const { fainter, faintee } = kill;
      const isPartOf = (pokemon: string, set: string[]) =>
        set.includes(pokemon);
      if (
        !(isPartOf(fainter, team1) && isPartOf(faintee, team2)) ||
        !(isPartOf(faintee, team1) && isPartOf(fainter, team2))
      ) {
        throw new Error(
          "Invalid kills -- all mentioned pokemon must be of either player's team."
        );
      }
    });

    const databaseKills = await Promise.all(
      kills.map(async (kill) =>
        prisma.kill.create({
          data: {
            faintee: {
              connect: {
                id: kill.faintee,
              },
            },
            fainter: {
              connect: {
                id: kill.fainter,
              },
            },
            match: {
              connect: {
                id: match.id,
              },
            },
          },
        })
      )
    );

    // can be done safely because it was previously checked that all kills match players' Pokemon
    const playersOwningPokemonThatKill = databaseKills.map((kill) =>
      team1.includes(kill.fainterId) ? player1.playerId : player2.playerId
    );

    const score = (associatedKills: number[], countFor: number) =>
      associatedKills.reduce((acc, cur) => (acc + cur === countFor ? 1 : 0));

    const player1Score = score(playersOwningPokemonThatKill, player1.playerId);
    const player2Score = score(playersOwningPokemonThatKill, player2.playerId);

    const determineWinner = async (winnerId?: number) => {
      if (winnerId) {
        const winner = await prisma.participatingPlayer.findUnique({
          where: {
            id: winnerId,
          },
        });
        if (!winner) {
          throw new Error("winnerId invalid");
        }
        const winnerValid = [player1.id, player2.id].includes(winner.id);
        if (!winnerValid) {
          throw new Error(
            "winnerId doesn't belong to either participating player"
          );
        }
        return winner;
      }
      if (player1Score === player2Score) {
        return null;
      }
      return {
        [player1Score]: player1,
        [player2Score]: player2,
      }[Math.max(player1Score, player2Score)];
    };

    const winner = await determineWinner(winnerId);

    return await prisma.match.update({
      where: {
        id: matchId,
      },
      data: {
        kills: {
          connect: databaseKills.map((kill) => ({
            id: kill.id,
          })),
        },
        score: {
          create: {
            player1Score: player1Score,
            player2Score: player2Score,
          },
        },
        winner: winner
          ? {
              connect: {
                id: winner.id,
              },
            }
          : undefined,
      },
    });
  }

  @Authorized<Role>(Role.ADMIN)
  @Mutation(() => [Match])
  async generateMatches(
    @Ctx() { prisma, user }: ContextType,
    @Arg("leagueId")
    leagueId: number
  ): Promise<Match[]> {
    if (!user) {
      throw new UnauthorizedError();
    }
    const league = await prisma.league.findUnique({
      where: {
        id: leagueId,
      },
      include: {
        allowedPlayers: true,
        matches: true,
      },
    });

    if (!league) {
      throw new Error("No league with this ID");
    }

    const players = league.allowedPlayers;

    if (league.matches.length > 0) {
      throw new Error("Can only generate if there are no matches so far.");
    }

    const season = await prisma.season.findFirst({
      where: {
        leagues: {
          some: {
            id: leagueId,
          },
        },
      },
      include: {
        scheduleRules: true,
      },
    });

    const randomizedPlayers = shuffle(players);

    const permutations = randomizedPlayers
      ?.flatMap((player1) =>
        players.map((player2) => ({
          player2,
          player1,
        }))
      )
      .filter(({ player1, player2 }) => player1 !== player2);

    if (!season?.scheduleRules || !season.startDate) {
      throw new Error(
        "A season's schedule rules and start date need to be configured to generate matches"
      );
    }

    const startDate = season?.startDate;
    const matchTurnus = season?.scheduleRules.matchTurnus;
    const rounds = season?.scheduleRules.matchTurnus;
    const matchTurnusAsDuration: Duration = {
      days: differenceInDays(matchTurnus, new Date(0)),
    };
    const matches: Match[] = [];
    permutations.forEach(async (permutation, index) => {
      const turn = Math.ceil(index + 1 / players.length - 1);
      Array(rounds).forEach(async (_, round) => {
        const dateOffset = add(startDate, {
          days: matchTurnusAsDuration.days! * turn + round * players.length - 1,
        });
        matches.push(
          await prisma.match.create({
            data: {
              date: dateOffset,
              player1: {
                create: {
                  player: {
                    connect: {
                      id: permutation.player1.id,
                    },
                  },
                },
              },
              player2: {
                create: {
                  player: {
                    connect: {
                      id: permutation.player2.id,
                    },
                  },
                },
              },
              league: {
                connect: {
                  id: leagueId,
                },
              },
            },
          })
        );
      });
    });
    return matches;
  }
}
