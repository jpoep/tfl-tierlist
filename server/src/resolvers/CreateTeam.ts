import { Season, Team } from "@prisma/client";
import { Arg, Ctx, Mutation, Query, Resolver, UnauthorizedError } from "type-graphql";
import { ContextType } from "../main";
import { Team as TeamType } from "@generated/type-graphql";

export class CreateTeam {
  @Mutation((returns) => TeamType)
  async createTeam(
    @Ctx() { prisma, user }: ContextType,
    @Arg("teamName") teamName: string,
    @Arg("teamLogo") teamLogo: string
  ): Promise<Team> {
    if (!user) {
      throw new UnauthorizedError();
    }
    return prisma.team.create({
      data: {
        teamLogo,
        teamName,
        person: {
          connect: {
            username: user.username,
          },
        },
      },
    });
  }
}
