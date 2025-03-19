import { prisma } from '@/lib/prisma';

export async function getChallengeTemplatesInsecure(
  text: string,
  page: number,
  pageSize: number,
) {
  const templates = await prisma.template.findMany({
    where: {
      OR: [
        {
          title: { contains: text, mode: 'insensitive' },
        },
        {
          description: { contains: text, mode: 'insensitive' },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return templates;
}

export async function getTotalAmountOfChallengeTemplatesInsecure(text: string) {
  const count = await prisma.template.count({
    where: {
      OR: [
        {
          title: { contains: text, mode: 'insensitive' },
        },
        {
          description: { contains: text, mode: 'insensitive' },
        },
      ],
    },
  });
  return count;
}
