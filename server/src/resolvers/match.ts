import {
    Match,
    Role,
    ConfiguredPokemonCreateUncheckedWithoutInRosterOfInput
} from "@prisma/client";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  UnauthorizedError,
} from "type-graphql";
import { ContextType } from "../main";
import { Season as SeasonType } from "@generated/type-graphql";
import { shuffle } from "d3-array";
import { add, differenceInDays } from "date-fns";

export class MatchResolver {
  @Authorized<Role>(Role.PLAYER)
  async registerTeam(
    @Ctx() { prisma, user }: ContextType,
    @Arg("matchId") matchId: number,
    @Arg("team") team: ConfiguredPokemonUncheckedCreateWithoutInRosterOfInput,
  ) {
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
    
      await prisma.participatingPlayer.update({
          where: {
            id: participatingPlayer.id
          },
          data: {
              roster: {
                  create: 
              }
          }
    })
    
  }
  @Authorized<Role>(Role.ADMIN)
  @Mutation((returns) => SeasonType)
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
