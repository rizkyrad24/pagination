const prisma = require("@prisma/client");

const model = new prisma.PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

model.$on("query", event => {
  console.info(`${("prisma:query")} ${event.query}`);
  console.info(`${("prisma:params")}: ${event.params}`);
  console.info(`${("prisma:duration")}: ${event.duration}ms`);
  console.info(`${("-----")}`);
});

module.exports = { model, prisma };
