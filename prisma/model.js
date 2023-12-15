const prisma = require("@prisma/client");

const model = new prisma.PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

module.exports = { model, prisma };
