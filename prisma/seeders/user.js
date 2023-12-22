const { model, prisma } = require("../model");
const { faker, Sex } = require("@faker-js/faker");

async function run() {
  await model.user.deleteMany({});
  for (let index = 0; index < 50; index++) {
    const gender = faker.helpers.arrayElement(Object.keys(prisma.Gender))
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName(gender);

    await model.user.create({
      data: {
        name: faker.person.fullName({firstName, lastName}),
        email: faker.internet.email({firstName, lastName, provider: "rwid.com"}),
        age: faker.number.int({min: 17, max: 60}),
        gender: gender
      },
    });
  }
}
module.exports = run;
