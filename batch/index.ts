import { PrismaClient } from "@prisma/client";
import config from "../src/config";

import { Cloud } from "nature-remo";

async function main() {
  const prisma = new PrismaClient();

  // 半年以上前のデータを消す
  const period = new Date(Date.now() - 1000 * 60 * 60 * 24 * 120);

  await Promise.all([
    prisma.temperatureStat.deleteMany({
      where: {
        created_at: {
          gte: period,
        },
      },
    }),

    prisma.humidityStat.deleteMany({
      where: {
        created_at: {
          gte: period,
        },
      },
    }),

    prisma.lightStat.deleteMany({
      where: {
        created_at: {
          gte: period,
        },
      },
    }),

    prisma.motionStat.deleteMany({
      where: {
        created_at: {
          gte: period,
        },
      },
    }),
  ]);

  const remoClient = new Cloud(config.remo_token);

  const [event] = await remoClient.getDevices();

  if (event == null) {
    return;
  }

  const { newest_events } = event;
  const { name } = event;

  let roomInfo = await findRoom(prisma, name);

  if (!roomInfo) {
    roomInfo = await prisma.room.create({
      data: { name },
    });
  }

  const now = new Date();

  try {
    await prisma.temperatureStat.create({
      data: {
        roomId: roomInfo.id,
        created_at: now,
        temperature: newest_events.te.val,
      },
    });
  } catch {}

  try {
    await prisma.humidityStat.create({
      data: {
        roomId: roomInfo.id,
        created_at: now,
        humidity: newest_events.hu.val,
      },
    });
  } catch {}

  try {
    await prisma.lightStat.create({
      data: {
        roomId: roomInfo.id,
        created_at: now,
        light: newest_events.il.val,
      },
    });
  } catch {}

  try {
    await prisma.motionStat.create({
      data: {
        roomId: roomInfo.id,
        // mo があるはずなのに型定義がない
        created_at: (newest_events as any)["mo"].created_at,
      },
    });
  } catch {}
}

main();

async function findRoom(client: PrismaClient, roomName: string) {
  const item = await client.room.findUnique({
    where: {
      name: roomName,
    },
  });

  return item;
}
