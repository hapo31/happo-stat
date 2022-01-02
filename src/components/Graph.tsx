import { ChartData } from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

type Props = {
  data: ChartData<"line">;
  leftGraphID?: string;
  rightGraphID?: string;
};

const commonOptions = {
  responsive: true,
  chartArea: {
    backgroundColor: "#ccc",
  },
};

export const Graph = ({ data, leftGraphID, rightGraphID }: Props) => {
  const options = useMemo(
    () =>
      leftGraphID && rightGraphID
        ? {
            [leftGraphID]: {
              position: "left",
            },
            [rightGraphID]: {
              position: "right",
            },
          }
        : {},
    [leftGraphID, rightGraphID]
  );

  return (
    <Line
      data={data}
      options={{
        ...commonOptions,
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                hour: "HH:mm",
              },
              tooltipFormat: "MM/dd HH:mm",
            },
            grid: {
              color: "#555",
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
          ...options,
        },
      }}
    />
  );
};

export const LightGraph = ({ data }: Props) => {
  return (
    <Line
      data={data}
      options={{
        ...commonOptions,
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                hour: "HH:mm",
              },
              tooltipFormat: "MM/dd hh:mm",
            },
            grid: {
              color: "#555",
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        },
      }}
    />
  );
};
