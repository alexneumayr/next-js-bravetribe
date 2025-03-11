import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initTemplates: Prisma.TemplateCreateInput[] = [
  {
    title: 'Clapping Challenge',
    description:
      'Clap loudly for 5 minutes in a public place without stopping. Embrace the awkwardness!',
    image: 'clapping.jpg',
    imageAlt: 'clapping hands',
  },
  {
    title: 'Roller Coaster Expert',
    description:
      'Ride the same roller coaster multiple times in a row and narrate the experience like a theme park expert.',
    image: 'rollercoaster.jpg',
    imageAlt: 'roller coaster',
  },
  {
    title: 'Free Hugs',
    description:
      'Stand in a public place with a "Free Hugs" sign and offer hugs to strangers.',
    image: 'hugs.jpg',
    imageAlt: 'koalas hugging each other',
  },
  {
    title: 'Public Speaking',
    description:
      "Give a short speech in a public place about any topic you're passionate about.",
    image: 'publicspeaking.jpg',
    imageAlt: 'person holding a public speech',
  },
  {
    title: 'Crazy Dancing',
    description:
      'Dance wildly in public without caring what people think. Bonus points if someone joins in!',
    image: 'dancing.jpg',
    imageAlt: 'guy dancing on the street',
  },
  {
    title: 'Public Singing',
    description:
      "Sing a song in public, as if you're performing for a crowd. No holding back!",
    image: 'singing.jpg',
    imageAlt: 'microphone',
  },
  {
    title: 'Public Sports',
    description:
      'Start doing a sports activity in public (e.g., push-ups, jumping jacks, jogging in place) for at least 5 minutes.',
    image: 'pushups.jpg',
    imageAlt: 'person doing push ups',
  },
  {
    title: 'Selfie Challenge',
    description:
      'Take selfies with as many strangers as possible within 10 minutes.',
    image: 'selfie.jpg',
    imageAlt: 'person taking a selfie',
  },
  {
    title: 'Wrong Store',
    description:
      "Go into a store and ask for something they obviously don't sell (e.g., ask for sushi in a hardware store).",
    image: 'shop.jpg',
    imageAlt: 'sign at the entrance of a shop',
  },
];

const initUsers: Prisma.UserCreateInput[] = [
  {
    email: 'sophia.miller@email.com',
    username: 'Sophia M.',
    passwordHash: 'securepassword1',
    role: 'user',
    aboutDescription:
      "I'm an adventurous traveler who loves meeting new people and experiencing different cultures. I believe that stepping out of my comfort zone is the best way to grow, and I'm excited to be part of a community that shares the same mindset.",
    avatarImage: 'user.jpg',
    gender: 'Woman',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to confidently approach strangers and start conversations.',
          },
          {
            title:
              "I want to do a solo trip to a country where I don't speak the language.",
          },
        ],
      },
    },
  },
  {
    email: 'jason.lee@email.com',
    username: 'Jason L.',
    passwordHash: 'securepassword2',
    role: 'user',
    aboutDescription:
      "I'm a software engineer who spends too much time behind a screen. I'm here to challenge myself socially and push past my usual comfort zone, especially when it comes to public interactions.",
    avatarImage: 'user.jpg',
    gender: 'Man',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to be able to sing in front of an audience without fear.',
          },
          {
            title:
              'I want to be more confident when giving technical presentations.',
          },
        ],
      },
    },
  },
  {
    email: 'emma.johnson@email.com',
    username: 'Emma J.',
    passwordHash: 'securepassword3',
    role: 'user',
    aboutDescription:
      "I'm a fitness coach who believes that mental challenges are just as important as physical ones. I love pushing myself in all aspects of life and helping others do the same.",
    avatarImage: 'user.jpg',
    gender: 'Woman',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to start conversations with random people at the gym.',
          },
          {
            title: 'I want to try an extreme sport that scares me.',
          },
        ],
      },
    },
  },
  {
    email: 'david.roberts@email.com',
    username: 'David R.',
    passwordHash: 'securepassword4',
    role: 'user',
    aboutDescription:
      "I'm an aspiring stand-up comedian who wants to become more comfortable performing in front of strangers. Every awkward situation is just another funny story waiting to happen.",
    avatarImage: 'user.jpg',
    gender: 'Man',
    goals: {
      createMany: {
        data: [
          {
            title: 'I want to perform stand-up comedy at an open mic night.',
          },
          {
            title:
              'I want to confidently start conversations with anyone, anywhere.',
          },
        ],
      },
    },
  },
  {
    email: 'lisa.taylor@email.com',
    username: 'Lisa T.',
    passwordHash: 'securepassword5',
    role: 'user',
    aboutDescription:
      "I'm a photographer who loves capturing human emotions. But when it comes to being in front of the camera myself, I struggle. I'm here to face that fear head-on.",
    avatarImage: 'user.jpg',
    gender: 'Woman',
    goals: {
      createMany: {
        data: [
          {
            title: 'I want to be comfortable taking selfies in public.',
          },
          {
            title: 'I want to ask strangers if I can take their portraits.',
          },
        ],
      },
    },
  },
];

const initChallenges: Prisma.ChallengeCreateInput[] = [
  {
    title: 'Selfie Challenge',
    description:
      'Take selfies with as many strangers as possible within 10 minutes.',
    User: {
      connect: { email: 'lisa.taylor@email.com' },
    },
    experiences: {
      create: {
        story:
          'I was hesitant at first, but after the first few people agreed, it became fun! Some even made silly faces for the pictures.',
        rating: 5,
        date: '2025-03-11T00:00:00.000Z',
        User: {
          connect: { email: 'lisa.taylor@email.com' },
        },
        comments: {
          create: {
            content: "Very cool man! That's really awesome!",
            User: {
              connect: { email: 'david.roberts@email.com' },
            },
          },
        },
        likes: {
          create: {
            User: {
              connect: { email: 'david.roberts@email.com' },
            },
          },
        },
      },
    },
  },
  {
    title: 'Public Speaking Challenge',
    description:
      "Give a short speech in front of a group of strangers on a topic you're passionate about.",
    User: {
      connect: { email: 'jason.lee@email.com' },
    },
    experiences: {
      create: {
        story:
          'I was nervous at first, but once I started speaking about tech, I felt more confident. It was empowering to share my knowledge with others.',
        rating: 4,
        date: '2025-03-12T00:00:00.000Z',
        User: {
          connect: { email: 'jason.lee@email.com' },
        },
        comments: {
          create: {
            content: 'Great job! You really nailed it!',
            User: {
              connect: { email: 'sophia.miller@email.com' },
            },
          },
        },
        likes: {
          create: {
            User: {
              connect: { email: 'sophia.miller@email.com' },
            },
          },
        },
      },
    },
  },
  {
    title: 'Solo Travel Challenge',
    description:
      "Take a solo trip to a place where you don't speak the language and document your journey.",
    User: {
      connect: { email: 'sophia.miller@email.com' },
    },
    experiences: {
      create: {
        story:
          "I visited a country where I didn't speak the language, and despite some challenges, it was an eye-opening experience. I learned so much about myself and the world.",
        rating: 5,
        date: '2025-03-13T00:00:00.000Z',
        User: {
          connect: { email: 'sophia.miller@email.com' },
        },
        comments: {
          create: {
            content: "Incredible journey! I'm inspired to do the same.",
            User: {
              connect: { email: 'emma.johnson@email.com' },
            },
          },
        },
        likes: {
          create: {
            User: {
              connect: { email: 'emma.johnson@email.com' },
            },
          },
        },
      },
    },
  },
  {
    title: 'Open Mic Comedy Challenge',
    description:
      'Perform stand-up comedy at an open mic night and make the audience laugh.',
    User: {
      connect: { email: 'david.roberts@email.com' },
    },
    experiences: {
      create: {
        story:
          "It was nerve-wracking at first, but once the audience laughed, I felt on top of the world. I can't wait to perform again!",
        rating: 5,
        date: '2025-03-14T00:00:00.000Z',
        User: {
          connect: { email: 'david.roberts@email.com' },
        },
        comments: {
          create: {
            content: 'You crushed it! I was laughing the whole time.',
            User: {
              connect: { email: 'jason.lee@email.com' },
            },
          },
        },
        likes: {
          create: {
            User: {
              connect: { email: 'jason.lee@email.com' },
            },
          },
        },
      },
    },
  },
  {
    title: 'Gym Conversation Challenge',
    description:
      'Start conversations with random people at the gym and ask them about their fitness journey.',
    User: {
      connect: { email: 'emma.johnson@email.com' },
    },
    experiences: {
      create: {
        story:
          'At first, I was intimidated, but once I started talking to people, I realized how easy it was to connect with others in the gym.',
        rating: 4,
        date: '2025-03-15T00:00:00.000Z',
        User: {
          connect: { email: 'emma.johnson@email.com' },
        },
        comments: {
          create: {
            content: 'Nice job! I need to try this next time at the gym.',
            User: {
              connect: { email: 'lisa.taylor@email.com' },
            },
          },
        },
        likes: {
          create: {
            User: {
              connect: { email: 'lisa.taylor@email.com' },
            },
          },
        },
      },
    },
  },
];

const initFriends: Prisma.FriendCreateInput[] = [
  {
    receiverUser: {
      connect: { email: 'lisa.taylor@email.com' },
    },
    requesterUser: {
      connect: { email: 'emma.johnson@email.com' },
    },
    isAccepted: true,
  },
  {
    receiverUser: {
      connect: { email: 'sophia.miller@email.com' },
    },
    requesterUser: {
      connect: { email: 'jason.lee@email.com' },
    },
    isAccepted: true,
  },
  {
    receiverUser: {
      connect: { email: 'jason.lee@email.com' },
    },
    requesterUser: {
      connect: { email: 'david.roberts@email.com' },
    },
    isAccepted: true,
  },
  {
    receiverUser: {
      connect: { email: 'david.roberts@email.com' },
    },
    requesterUser: {
      connect: { email: 'lisa.taylor@email.com' },
    },
    isAccepted: true,
  },
  {
    receiverUser: {
      connect: { email: 'emma.johnson@email.com' },
    },
    requesterUser: {
      connect: { email: 'sophia.miller@email.com' },
    },
    isAccepted: true,
  },
];

async function main() {
  console.log(`Start seeding...`);

  await prisma.template.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.friend.deleteMany();
  await prisma.user.deleteMany();

  for (const template of initTemplates) {
    const newTemplate = await prisma.template.create({
      data: template,
    });
    console.log(`Created template with id: ${newTemplate.id}`);
  }

  for (const user of initUsers) {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user (including goals) with id: ${newUser.id}`);
  }

  for (const challenge of initChallenges) {
    const newChallenge = await prisma.challenge.create({
      data: challenge,
    });
    console.log(
      `Created challenge (including experience with like and comment) with id: ${newChallenge.id}`,
    );
  }

  for (const friend of initFriends) {
    const newFriend = await prisma.friend.create({
      data: friend,
    });
    console.log(`Created friend with id: ${newFriend.id}`);
  }
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
