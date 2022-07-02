import type { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import fetch from "isomorphic-fetch";
import * as df from "date-fns";
import { RoomInfo } from "../src/domain/Stat";
import { getStats } from "./api/stat";
import { Chart } from "chart.js";
import { Graph, LightGraph } from "../src/components/Graph";
import useGraphData from "../src/hooks/useGraphData";

type ServerProps = {
  rooms: RoomInfo[];
};

Chart.defaults.elements.point.radius = 4;
Chart.defaults.elements.point.hitRadius = 5;
Chart.defaults.elements.point.hoverRadius = 6;
Chart.defaults.font.size = 20;
Chart.defaults.color = "#eee";
Chart.defaults.plugins.title.color = "#eee";
Chart.defaults.aspectRatio = 2;

const Index = ({ rooms: initialRooms }: ServerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState(initialRooms);
  const [roomSelect, setRoomSelect] = useState(0);

  const room = useMemo(() => rooms[roomSelect] ?? null, [roomSelect, rooms]);

  const [temperaturesAndHumidityGraphData, lightsGraphData] =
    useGraphData(room);

  return (
    <div className="container">
      <Head>
        <title>Noa’s ARC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
          html {
            background-color: #686868;
          }`}
        </style>
      </Head>

      <div className="title-container">
        <h1 className="title">お部屋の情報</h1>
        {rooms.length > 0 && (
          <select
            className="select room-select"
            defaultValue={0}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRoomSelect(val);
            }}
          >
            {rooms.map((item, index) => (
              <option
                key={`${index}-${item.name}`}
                label={item.name}
                value={index}
              />
            ))}
          </select>
        )}
        <select
          disabled={isLoading}
          className="select period-select"
          onChange={async (e) => {
            try {
              setIsLoading(true);
              const periodDays = parseInt(e.target.value);
              const res = await fetch(`/api/stat?period=${periodDays}`);
              const data: RoomInfo[] = await res.json();
              setRooms(data);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <option value="7">1週間</option>
          <option value="14">2週間</option>
          <option value="30">1ヶ月</option>
          <option value="90">3ヶ月</option>
          <option value="180">6ヶ月</option>
        </select>
      </div>
      <div className="graph-container">
        {temperaturesAndHumidityGraphData != null && (
          <Graph
            data={temperaturesAndHumidityGraphData}
            leftGraphID="temperatures"
            rightGraphID="humidities"
          />
        )}
      </div>
      <div className="graph-container">
        {lightsGraphData != null && <LightGraph data={lightsGraphData} />}
      </div>

      <style jsx>{`
        .container {
          min-width: 620px;
          background-color: #868686;
        }
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #686868;
          border-bottom: 2px solid #555;
          height: 60px;

          padding: 0 20px;
        }

        .title {
          color: #eee;
          flex-grow: 2;
        }

        .select {
          height: 24px;
          margin-right: 5px;
        }

        .room-select {
          flex-grow: 1;
        }

        .period-select {
          flex-grow: 1;
        }

        .graph-container {
          aspect-ratio: 2;
        }
      `}</style>
    </div>
  );
};

export default Index;
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const lastWeek = df.startOfDay(new Date());
  const rooms = await getStats(df.subDays(lastWeek, 7));

  return {
    props: {
      rooms: rooms.map((room) => ({
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
      })),
    },
  };
};
