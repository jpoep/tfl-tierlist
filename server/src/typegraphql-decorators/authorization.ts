import {
  ResolversEnhanceMap,
  ResolverActionsConfig,
  applyResolversEnhanceMap,
} from "@generated/type-graphql";
import { Role } from "@prisma/client";
import { AuthChecker, Authorized } from "type-graphql";
import { ContextType } from "../main";

type AuthCheckerType = {
  roles: Role[];
  self: boolean;
};

// define the decorators config using generic ResolverActionsConfig<TModelName> type
const seasonsActionsConfig: ResolverActionsConfig<"Season"> = {
  createManySeason: [Authorized<Role>(Role.ADMIN)],
  createSeason: [Authorized<Role>(Role.ADMIN)],
};
const leaguesActionsConfig: ResolverActionsConfig<"League"> = {
  createLeague: [Authorized()],
  createManyLeague: [Authorized()],
};
const teamActionsConfig: ResolverActionsConfig<"Team"> = {
  createTeam: [Authorized<Role>()],
};
const userActionsConfig: ResolverActionsConfig<"User"> = {
  createUser: [
    Authorized<AuthCheckerType>({ roles: [Role.INVITER], self: false }),
  ],
};

// join the actions config into a single resolvers enhance object
const resolversEnhanceMap: ResolversEnhanceMap = {
  Season: seasonsActionsConfig,
  League: leaguesActionsConfig,
  Team: teamActionsConfig,
  User: userActionsConfig,
};

// apply the config (it will apply decorators on the resolver class methods)
applyResolversEnhanceMap(resolversEnhanceMap);

export const customAuthChecker: AuthChecker<ContextType, AuthCheckerType> = (
  { root, args, context, info },
  roles: AuthCheckerType[]
) => {
  console.log(args["data"].person);
  const allowedRoles = roles.flatMap((it) => it.roles);
  console.log(allowedRoles);
  return (
    context.user?.roles.some((role) => allowedRoles.includes(role)) ||
    allowedRoles.length === 0
  );
};
