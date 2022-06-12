import { Season } from "@prisma/client";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContextType } from "../main";
import { Season as SeasonType} from '@generated/type-graphql'

export class CreateSeason {
  @Mutation(returns => SeasonType)
  async createSeason(
    @Ctx() { prisma }: ContextType,
    @Arg("number") number: number,
    @Arg("startDate") startDate: Date
  ): Promise<Season> {
    return await prisma.season.create({
      data: {
        number,
        startDate,
      },
    });
  }
}
