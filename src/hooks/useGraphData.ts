import { useMemo } from "react";
import { RoomInfo } from "../domain/Stat";

import { ChartData } from "chart.js";

export default function useGraphData(roomInfo: RoomInfo) {
  const temperaturesAndHumidityGraphData: ChartData<"line"> | null =
    useMemo(() => {
      const temperatures = roomInfo?.temperatures;
      const humidities = roomInfo?.humidities;

      return temperatures != null && humidities != null
        ? {
            labels: temperatures.map((item) => item.createdAt),
            datasets: [
              {
                fillColor: "#fcc",
                backgroundColor: "#fcc",
                borderColor: "#f55",
                data: temperatures?.map((item) => item.value),
                label: "温度",
                yAxisID: "temperatures",
                position: "right",
              },
              {
                fillColor: "#cfc",
                borderColor: "#55f",
                pointBackgroundColor: "#cfc",
                pointBorderColor: "#afa",
                data: humidities?.map((item) => item.value),
                label: "湿度",
                yAxisID: "humidities",
              },
            ],
          }
        : null;
    }, [roomInfo?.humidities, roomInfo?.temperatures]);

  const lightsGraphData: ChartData<"line"> | null = useMemo(() => {
    const lights = roomInfo?.lights;
    return lights != null
      ? {
          labels: lights?.map((item) => item.createdAt),
          datasets: [
            {
              fillColor: "#ccf",
              borderColor: "#55f",
              pointBackgroundColor: "#ccf",
              pointBorderColor: "#aaf",
              data: lights?.map((item) => item.value),
              label: "明るさ",
            },
          ],
        }
      : null;
  }, [roomInfo?.lights]);

  return [temperaturesAndHumidityGraphData, lightsGraphData] as const;
}
