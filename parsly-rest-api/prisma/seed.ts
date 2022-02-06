import { EventObjectType, PrismaClient } from '@prisma/client';
import { randomEvents } from './fake-data/events';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.event.deleteMany();
  await prisma.eventObject.deleteMany();

  console.log('Seeding...');

  const demoUser = {
    data: {
      email: 'demo@foobar.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  };

  for (const event of randomEvents) {
    await prisma.event.create({ data: event });
  }

  await prisma.user.create(demoUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
