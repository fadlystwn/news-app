import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '123456789',
      Profile: {
        create: {
          bio: 'Software engineer and tech enthusiast.',
          avatarUrl: 'https://example.com/avatar/john.png',
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      phone: '987654321',
      Profile: {
        create: {
          bio: 'Avid reader and content creator.',
          avatarUrl: 'https://example.com/avatar/jane.png',
        },
      },
    },
  });

  // Seed News
  await prisma.news.createMany({
    data: [
      {
        title: 'Breaking News: Prisma is Awesome!',
        content: 'Prisma simplifies database access for developers.',
        authorId: user1.id,
        imageUrl: 'https://example.com/images/news1.png',
        headline: 'Prisma is a game-changer!',
      },
      {
        title: 'Tech Trends 2024',
        content: 'A deep dive into the top tech trends for 2024.',
        authorId: user2.id,
        imageUrl: 'https://example.com/images/news2.png',
        headline: 'Emerging technologies to watch.',
      },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
