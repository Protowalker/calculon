import { Prisma, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await buildCalculator();
}

seed();

async function buildCalculator() {
  const inputs = [
    {
      kind: "text",
      name: "name",
      displayName: "Name",
      value: "Jackie",
      order: 0,
      uuid: "13874235bhv",
    },
    {
      kind: "toggle",
      name: "tm",
      displayName: "Trademark?",
      value: true,
      order: 1,
      uuid: "1234rfujnvxc",
    },
    {
      kind: "number",
      name: "prevAge",
      displayName: "Age 5 years ago",
      value: 14,
      order: 2,
      uuid: "1231b3n45v",
    },
  ];

  const outputs = [
    {
      kind: "text",
      name: "textout0",
      displayName: "Age Calculation",
      uuid: "131dfvcgbdr5t",
      order: 0,
      value: "{{name}} {{tm ? '(TM)' : ''}} is {{prevAge + 5}} years old.",
    },
  ];

  await db.calculator.upsert({
    where: { slug: "first-calc-ever" },
    update: {},
    create: {
      slug: "first-calc-ever",
      displayName: "First Calculator Ever",
      inputs: JSON.stringify(inputs),
      outputs: JSON.stringify(outputs),
    },
  });
}
