import {
  League,
  PickRules,
  Pokemon,
  PrismaClient,
  Role,
  Season,
  Team,
  Tier,
  User,
} from "@prisma/client";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  UnauthorizedError,
} from "type-graphql";
import { ContextType } from "../main";
import {
  Team as TeamType,
  PokemonWhereUniqueInput,
} from "@generated/type-graphql";

export class TeamResolver {
  @Authorized<Role>(Role.PLAYER)
  @Mutation((returns) => TeamType)
  async createTeam(
    @Ctx() { prisma, user }: ContextType,
    @Arg("teamName") teamName: string,
    @Arg("teamLogo") teamLogo: string,
    @Arg("league") leagueId: number
  ): Promise<Team> {
    if (!user) {
      throw new UnauthorizedError();
    }

    const league = await prisma.league.findUnique({
      where: {
        id: leagueId,
      },
      include: {
        allowedPlayers: true,
      },
    });

    if (!league) {
      throw new Error("League doesn't exist.");
    }

    const isAllowedToParticipate = league.allowedPlayers
      .map((it) => it.id)
      .includes(user.id);

    if (!isAllowedToParticipate) {
      throw new Error(
        "You are not part of the league you are trying to create a team for. Ask your manager to add you."
      );
    }

    return prisma.team.create({
      data: {
        teamLogo,
        teamName,
        person: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  @Authorized<Role>(Role.PLAYER)
  @Mutation((returns) => TeamType)
  async updateTeam(
    @Ctx() { prisma, user }: ContextType,
    @Arg("teamId") teamId: number,
    @Arg("teamName", { nullable: true }) teamName?: string,
    @Arg("teamLogo", { nullable: true }) teamLogo?: string,
    @Arg("pokemon", () => [PokemonWhereUniqueInput], { nullable: true })
    pokemon?: PokemonWhereUniqueInput[]
  ): Promise<Team> {
    if (!user) {
      throw new UnauthorizedError();
    }
    const team = await this.findAndValidateTeam(prisma, user, teamId);
    const fetchedPokemon = await prisma.pokemon.findMany({
      where: {
        id: {
          in: pokemon?.map((it) => it.id!),
        },
      },
    });

    const league = await prisma.league.findUnique({
      where: {
        id: team.leagueId!,
      },
      include: {
        allowedPlayers: true,
        teams: true,
        season: {
          include: {
            pickRules: {
              include: {
                tiers: true,
              },
            },
          },
        },
      },
    });

    pokemon && (await this.validatePokemon(league!, fetchedPokemon));

    return prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        teamName,
        teamLogo,
        pokemon: pokemon && {
          connect: pokemon?.map((it) => ({ id: it.id })),
        },
      },
    });
  }

  private async findAndValidateTeam(
    prisma: PrismaClient,
    user: User,
    teamId: number
  ): Promise<TeamType> {
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
    if (!team) {
      throw new Error("No team found.");
    }
    const league = await prisma.league.findUnique({
      where: {
        id: team.id,
      },
      include: {
        season: {
          include: {
            managers: true,
          },
        },
      },
    });
    if (!league) {
      throw Error("This team is part of no league.");
    }
    if (
      user.id !== team?.userId &&
      !league.season.managers.map((it) => it.id).includes(user.id)
    ) {
      throw new Error(
        "Only yourself or a season's manager may edit your teams."
      );
    }
    return team;
  }

  private async validatePokemon(
    league: League & {
      teams: TeamType[];
      season: Season & { pickRules: (PickRules & { tiers: Tier[] })[] };
    },
    pokemon: Pokemon[]
  ): Promise<void> {
    const pokemonInLeague = league.teams.flatMap((team) => team.pokemon);
    if (pokemon.some((mon) => pokemonInLeague.includes(mon))) {
      throw Error("Each Pokemon must only be picked once within a league.");
    }

    // TODO: validate pick rules are obeyed
    // const pickRules = league.season.pickRules;
  }
}
