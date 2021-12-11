import type { NextApiRequest, NextApiResponse } from "next";
import {
  HumidityStat,
  LightStat,
  MotionStat,
  PrismaClient,
  Room,
  TemperatureStat,
} from "@prisma/client";

import * as df from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { period } = req.query;

  let date;
  if (period == null) {
    date = undefined;
  } else if (typeof period === "string") {
    date = new Date(parseInt(period));
  } else {
    res.status(400).json({
      message: "{period} must be unix time.",
    });
    return;
  }

  const data = await getStats(date);
  res.status(200).json(
    data.map((room) => ({
      name: room.name,
      humidities: room.humidities.map((item) => ({
        value: item.humidity,
        createdAt: item.created_at.getTime(),
      })),
      temperatures: room.temperatures.map((item) => ({
        value: item.temperature,
        createdAt: item.created_at.getTime(),
      })),
      motions: room.motions.map((item) => ({
        createdAt: item.created_at.getTime(),
      })),
      lights: room.lights.map((item) => ({
        value: item.light,
        createdAt: item.created_at.getTime(),
      })),
    }))
  );
}

export async function getStats(period?: Date): Promise<StatResponse> {
  if (period == null) {
    const lastWeek = df.subDays(new Date(), 7);
    period = df.startOfDay(lastWeek);
  }

  const prisma = new PrismaClient();

  const rangeWhere = {
    created_at: {
      gte: period,
    },
  };

  const result = await prisma.room.findMany({
    include: {
      motions: {
        where: rangeWhere,
      },
      humidities: {
        where: rangeWhere,
      },
      lights: {
        where: rangeWhere,
      },
      temperatures: {
        where: rangeWhere,
      },
    },
  });

  prisma.$disconnect();

  return result;
}

export type StatResponse = (Room & {
  motions: MotionStat[];
  humidities: HumidityStat[];
  lights: LightStat[];
  temperatures: TemperatureStat[];
})[];
