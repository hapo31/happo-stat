import { PrismaClient } from "@prisma/client";
import config from "../src/config";

import { Cloud } from "nature-remo";

async function main() {
  const prisma = new PrismaClient();
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

  try {
    await prisma.temperatureStat.upsert({
      where: {
        created_at: newest_events.te.created_at,
      },
      update: {
        temperature: newest_events.te.val,
      },
      create: {
        roomId: roomInfo.id,
        created_at: newest_events.te.created_at,
        temperature: newest_events.te.val,
      },
    });
  } catch {}

  try {
    await prisma.humidityStat.upsert({
      where: {
        created_at: newest_events.hu.created_at,
      },
      update: {
        humidity: newest_events.hu.val,
      },
      create: {
        roomId: roomInfo.id,
        created_at: newest_events.hu.created_at,
        humidity: newest_events.hu.val,
      },
    });
  } catch {}

  try {
    await prisma.lightStat.upsert({
      where: {
        created_at: newest_events.il.created_at,
      },
      update: {
        light: newest_events.il.val,
      },
      create: {
        roomId: roomInfo.id,
        created_at: newest_events.il.created_at,
        light: newest_events.il.val,
      },
    });
  } catch {}

  try {
    await prisma.motionStat.upsert({
      where: {
        created_at: newest_events.il.created_at,
      },
      update: {},
      create: {
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
