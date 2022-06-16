import { RatingRules, Role, ScheduleRules, Season } from "@prisma/client";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  Query,
  Resolver,
  UnauthorizedError,
} from "type-graphql";
import { ContextType } from "../main";
import {
  Season as SeasonType,
  TierCreateWithoutSeasonInput,
  PickRulesCreateWithoutSeasonInput,
  ScheduleRulesCreateWithoutSeasonsInput,
  RatingRulesCreateWithoutSeasonInput,
  ClauseCreateWithoutSeasonInput,
  UserWhereUniqueInput,
} from "@generated/type-graphql";

export class SeasonResolver {
  @Authorized<Role>(Role.ADMIN)
  @Mutation((returns) => SeasonType)
  async createSeason(
    @Ctx() { prisma, user }: ContextType,
    @Arg("number") number: number,
    @Arg("tierlist", () => [TierCreateWithoutSeasonInput])
    tierlist: TierCreateWithoutSeasonInput[],
    @Arg("pickRules", () => [PickRulesCreateWithoutSeasonInput])
    pickRules: PickRulesCreateWithoutSeasonInput[],
    @Arg("scheduleRules") scheduleRules: ScheduleRulesCreateWithoutSeasonsInput,
    @Arg("ratingRules") ratingRules: RatingRulesCreateWithoutSeasonInput,
    @Arg("clauses", () => [ClauseCreateWithoutSeasonInput])
    clauses: ClauseCreateWithoutSeasonInput[],
    @Arg("managers", () => [UserWhereUniqueInput], {
      defaultValue:
        "Additional users that may manage this season. You are included by default.",
      nullable: true,
    })
    managers?: UserWhereUniqueInput[],
    @Arg("startDate", { nullable: true }) startDate?: Date,
    @Arg("endDate", { nullable: true }) endDate?: Date,
    @Arg("name", { nullable: true }) name?: string
  ): Promise<Season> {
    if (!user) {
      throw new UnauthorizedError();
    }
    managers?.push({
      id: user.id,
      username: user.username,
    });
    return prisma.season.create({
      data: {
        number,
        tierlist: { create: tierlist },
        pickRules: { create: pickRules },
        scheduleRules: { create: scheduleRules },
        ratingRules: { create: ratingRules },
        clauses: { create: clauses },
        managers: managers && { connect: managers },
        startDate,
        endDate,
        name,
      },
    });
  }

  @Mutation(() => SeasonType)
  async updateSeason(
    @Ctx() { prisma, user }: ContextType,
    @Arg("number") number: number,
    @Arg("startDate", { nullable: true }) startDate?: Date,
    @Arg("endDate", { nullable: true }) endDate?: Date,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("managers", () => [UserWhereUniqueInput], {
      defaultValue:
        "Additional users that may manage this season. You are included by default.",
      nullable: true,
    })
    managers?: UserWhereUniqueInput[]
  ): Promise<SeasonType> {
    if (!user) {
      throw new UnauthorizedError();
    }
    const season = await prisma.season.findUnique({
      where: { number },
      include: { managers: true },
    });
    if (
      !user.roles.includes("ADMIN") &&
      !season?.managers.map((it) => it.id).includes(user.id)
    ) {
      throw new UnauthorizedError();
    }
    return prisma.season.update({
      where: { number },
      data: {
        startDate,
        endDate,
        name,
        managers: managers && { connect: managers },
      },
    });
  }
}
