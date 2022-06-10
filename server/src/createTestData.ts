import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function initDb() {
  const sTier = await prisma.tier.create({
    data: {
      rank: 1,
      emptySearchtext: "Kek",
      name: "S",
    },
  });

  await prisma.season.create({
    data: {
      number: 4,
      startDate: new Date(),
      ratingRules: {
        create: {
          scorePerDraw: 1,
          scorePerLoss: 0,
          scorePerWin: 3,
        },
      },
      scheduleRules: {
        create: {
          matchTurnus: new Date(),
          midSeasonTournament: false,
          playoffs: true,
          rounds: 1,
        },
      },
      clauses: {
        create: [{ title: "Don't suck", description: "Suck and you lose" }],
      },
      pickRules: {
        create: [
          {
            picks: 2,
            tiers: {
              connect: {
                id: sTier.id,
              },
            },
          },
        ],
      },
    },
  });
}
initDb();