import { prisma } from '@/lib/prisma';

export async function getNewestExperiencesInsecure() {
  const users = await prisma.experience.findMany({
    orderBy: [{ created_at: 'desc' }],
    take: 10,
    include: {
      Challenge: true,
      likes: true,
      comments: true,
      User: { include: { experiences: true } },
    },
  });
  return users;
}
