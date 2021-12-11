import { useMemo } from "react";
import { RoomInfo } from "../domain/Stat";

import * as df from "date-fns";
import { ChartData } from "chart.js";

export default function useGraphData({
  humidities,
  lights,
  temperatures,
}: RoomInfo) {
  if (!humidities || !temperatures || !lights) {
    throw new Error("data is null");
  }

  const temperaturesAndHumidityGraphData: ChartData<"line"> = useMemo(
    () => ({
      labels: temperatures.map((item) => item.createdAt),
      // humidities.map((item) => item.createdAt),
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
    }),
    [humidities, temperatures]
  );

  const lightsGraphData: ChartData<"line"> = useMemo(
    () => ({
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
    }),
    [lights]
  );

  return [temperaturesAndHumidityGraphData, lightsGraphData] as const;
}
