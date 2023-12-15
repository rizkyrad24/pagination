const { model } = require("../model");
const { faker } = require("@faker-js/faker");

(async () => {
  try {
    await model.user.deleteMany({});
    for (let index = 0; index < 50; index++) {
      await model.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email()
        },
      });
    }
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    await model.$disconnect();
  }
})();
