const { model } = require("../model");
const { faker } = require("@faker-js/faker");
const userSeeder = require("./user.js");

(async () => {
  try {
    userSeeder();
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    await model.$disconnect();
  }
})();
