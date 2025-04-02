import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initTemplates: Prisma.TemplateCreateInput[] = [
  {
    title: 'Clapping Challenge',
    description:
      'Clap loudly for 5 minutes in a public place without stopping. Embrace the awkwardness!',
    imageUrl: 'clapping.jpg',
    imageAlt: 'clapping hands',
  },
  {
    title: 'Roller Coaster Expert',
    description:
      'Ride the same roller coaster multiple times in a row and narrate the experience like a theme park expert.',
    imageUrl: 'rollercoaster.jpg',
    imageAlt: 'roller coaster',
  },
  {
    title: 'Free Hugs',
    description:
      'Stand in a public place with a "Free Hugs" sign and offer hugs to strangers.',
    imageUrl: 'hugs.jpg',
    imageAlt: 'koalas hugging each other',
  },
  {
    title: 'Public Speaking',
    description:
      "Give a short speech in a public place about any topic you're passionate about.",
    imageUrl: 'publicspeaking.jpg',
    imageAlt: 'person holding a public speech',
  },
  {
    title: 'Crazy Dancing',
    description:
      'Dance wildly in public without caring what people think. Bonus points if someone joins in!',
    imageUrl: 'dancing.jpg',
    imageAlt: 'guy dancing on the street',
  },
  {
    title: 'Public Singing',
    description:
      "Sing a song in public, as if you're performing for a crowd. No holding back!",
    imageUrl: 'singing.jpg',
    imageAlt: 'microphone',
  },
  {
    title: 'Public Sports',
    description:
      'Start doing a sports activity in public (e.g., push-ups, jumping jacks, jogging in place) for at least 5 minutes.',
    imageUrl: 'pushups.jpg',
    imageAlt: 'person doing push ups',
  },
  {
    title: 'Selfie Challenge',
    description:
      'Take selfies with as many strangers as possible within 10 minutes.',
    imageUrl: 'selfie.jpg',
    imageAlt: 'person taking a selfie',
  },
  {
    title: 'Wrong Store',
    description:
      "Go into a store and ask for something they obviously don't sell (e.g., ask for sushi in a hardware store).",
    imageUrl: 'shop.jpg',
    imageAlt: 'sign at the entrance of a shop',
  },
];

const initUsers: Prisma.UserCreateInput[] = [
  {
    email: 'sophia.miller@email.com',
    username: 'sophia_m',
    passwordHash: 'securepassword1',
    role: 'user',
    aboutDescription:
      "I'm an adventurous traveler who loves meeting new people and experiencing different cultures. I believe that stepping out of my comfort zone is the best way to grow, and I'm excited to be part of a community that shares the same mindset.",
    avatarImageUrl:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1742924375/jswesuiu8smbsgoql8fb.jpg',
    gender: 'Woman',
    location: 'Berlin, Germany',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to confidently approach strangers and start conversations.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
          {
            title:
              "I want to do a solo trip to a country where I don't speak the language.",
            deadline: '2026-03-18T10:06:10.000Z',
          },
        ],
      },
    },
  },
  {
    email: 'jason.lee@email.com',
    username: 'jasonlee',
    passwordHash: 'securepassword2',
    role: 'user',
    aboutDescription:
      "I'm a software engineer who spends too much time behind a screen. I'm here to challenge myself socially and push past my usual comfort zone, especially when it comes to public interactions.",
    avatarImageUrl:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1742924608/fo7hrylqwtjaptjcvzeh.jpg',
    gender: 'Man',
    location: 'San Francisco, USA',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to be able to sing in front of an audience without fear.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
          {
            title:
              'I want to be more confident when giving technical presentations.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
        ],
      },
    },
  },
  {
    email: 'emma.johnson@email.com',
    username: 'emma',
    passwordHash: 'securepassword3',
    role: 'user',
    aboutDescription:
      "I'm a fitness coach who believes that mental challenges are just as important as physical ones. I love pushing myself in all aspects of life and helping others do the same.",
    avatarImageUrl:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1742924773/z5agzxsofazcfhnlmmot.jpg',
    gender: 'Woman',
    location: 'London, UK',
    goals: {
      createMany: {
        data: [
          {
            title:
              'I want to start conversations with random people at the gym.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
          {
            title: 'I want to try an extreme sport that scares me.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
        ],
      },
    },
  },
  {
    email: 'david.roberts@email.com',
    username: 'david_nyc',
    passwordHash: 'securepassword4',
    role: 'user',
    aboutDescription:
      "I'm an aspiring stand-up comedian who wants to become more comfortable performing in front of strangers. Every awkward situation is just another funny story waiting to happen.",
    avatarImageUrl:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1742924075/pbwaap3bpjjex7o1snnz.jpg',
    gender: 'Man',
    location: 'New York, USA',
    goals: {
      createMany: {
        data: [
          {
            title: 'I want to perform stand-up comedy at an open mic night.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
          {
            title:
              'I want to confidently start conversations with anyone, anywhere.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
        ],
      },
    },
  },
  {
    email: 'lisa.taylor@email.com',
    username: 'lisataylor',
    passwordHash: 'securepassword5',
    role: 'user',
    aboutDescription:
      "I'm a photographer who loves capturing human emotions. But when it comes to being in front of the camera myself, I struggle. I'm here to face that fear head-on.",
    avatarImageUrl:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1742924514/okgt3xvknwlg5us8lnn3.jpg',
    gender: 'Woman',
    location: 'Sydney, Australia',
    goals: {
      createMany: {
        data: [
          {
            title: 'I want to be comfortable taking selfies in public.',
            deadline: '2026-03-18T10:06:10.000Z',
          },
          {
            title: 'I want to ask strangers if I can take their portraits.',
            deadline: '2026-03-18T10:06:10.000Z',
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
    plannedDate: '2025-01-10T00:00:00.000Z',
    user: {
      connect: { email: 'lisa.taylor@email.com' },
    },

    experiences: {
      create: {
        title: 'Overcoming Hesitation: A Selfie Journey',
        story:
          'I was hesitant at first, but after the first few people agreed, it became fun! Some even made silly faces for the pictures.',
        rating: 5,
        date: '2025-01-10T00:00:00.000Z',
        imageUrl:
          'https://res.cloudinary.com/duayl4vkp/image/upload/v1743066790/nb0iq65mqf6ttgr4kikg.jpg',
        user: {
          connect: { email: 'lisa.taylor@email.com' },
        },
        comments: {
          create: {
            content: "Very cool! That's really awesome!",
            user: {
              connect: { email: 'david.roberts@email.com' },
            },
          },
        },
        likes: {
          create: {
            user: {
              connect: { email: 'david.roberts@email.com' },
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
    plannedDate: '2024-10-05T00:00:00.000Z',
    user: {
      connect: { email: 'sophia.miller@email.com' },
    },
    experiences: {
      create: {
        title: 'A Journey of Discovery: Solo Travel',
        story:
          "I visited a country where I didn't speak the language, and despite some challenges, it was an eye-opening experience. I learned so much about myself and the world.",
        rating: 5,
        date: '2024-10-05T00:00:00.000Z',
        imageUrl:
          'https://res.cloudinary.com/duayl4vkp/image/upload/v1743066625/nctvboqhu41q7xe7et5p.jpg',
        user: {
          connect: { email: 'sophia.miller@email.com' },
        },
        comments: {
          create: {
            content: "Incredible journey! I'm inspired to do the same.",
            user: {
              connect: { email: 'emma.johnson@email.com' },
            },
          },
        },
        likes: {
          create: {
            user: {
              connect: { email: 'emma.johnson@email.com' },
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
    plannedDate: '2024-11-12T00:00:00.000Z',
    user: {
      connect: { email: 'jason.lee@email.com' },
    },
    experiences: {
      create: {
        title: 'From Nervousness to Confidence: Public Speaking',
        story:
          'I was nervous at first, but once I started speaking about tech, I felt more confident. It was empowering to share my knowledge with others.',
        rating: 4,
        date: '2024-11-12T00:00:00.000Z',
        imageUrl:
          'https://res.cloudinary.com/duayl4vkp/image/upload/v1743067293/atrbwp3ox0yquxpwusuo.jpg',
        user: {
          connect: { email: 'jason.lee@email.com' },
        },
        comments: {
          create: {
            content: 'Great job! You really nailed it!',
            user: {
              connect: { email: 'sophia.miller@email.com' },
            },
          },
        },
        likes: {
          create: {
            user: {
              connect: { email: 'sophia.miller@email.com' },
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
    plannedDate: '2025-02-08T00:00:00.000Z',
    user: {
      connect: { email: 'emma.johnson@email.com' },
    },
    experiences: {
      create: {
        title: 'Breaking the Ice: Gym Conversations',
        story:
          'At first, I was intimidated, but once I started talking to people, I realized how easy it was to connect with others in the gym.',
        rating: 4,
        date: '2025-02-08T00:00:00.000Z',
        imageUrl:
          'https://res.cloudinary.com/duayl4vkp/image/upload/v1743066007/rlldzwpizwztvhaqyrf5.jpg',
        user: {
          connect: { email: 'emma.johnson@email.com' },
        },
        comments: {
          create: {
            content: 'Nice job! I need to try this next time at the gym.',
            user: {
              connect: { email: 'lisa.taylor@email.com' },
            },
          },
        },
        likes: {
          create: {
            user: {
              connect: { email: 'lisa.taylor@email.com' },
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
    plannedDate: '2025-03-01T00:00:00.000Z',
    user: {
      connect: { email: 'david.roberts@email.com' },
    },
    experiences: {
      create: {
        title: 'Laughter and Nerves: The Open Mic Experience',
        story:
          "It was nerve-wracking at first, but once the audience laughed, I felt on top of the world. I can't wait to perform again!",
        rating: 5,
        date: '2025-03-01T00:00:00.000Z',
        imageUrl:
          'https://res.cloudinary.com/duayl4vkp/image/upload/v1743068617/syhfovbtmemu1uwuqazx.jpg',
        user: {
          connect: { email: 'david.roberts@email.com' },
        },
        comments: {
          create: {
            content: 'You crushed it! I was laughing the whole time.',
            user: {
              connect: { email: 'jason.lee@email.com' },
            },
          },
        },
        likes: {
          create: {
            user: {
              connect: { email: 'jason.lee@email.com' },
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
  /*
  // Deletion block for re-seeding:
  // Only needed for resetting existing tables
  await prisma.template.deleteMany();
  await prisma.session.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.friend.deleteMany();
  await prisma.user.deleteMany(); */

  console.log(`Start seeding...`);

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
