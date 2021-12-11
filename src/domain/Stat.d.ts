export type StatInfo = {
  value: number;
  createdAt: number;
};
export type RoomInfo = {
  name: string;
  temperatures?: StatInfo[];
  humidities?: StatInfo[];
  lights?: StatInfo[];
  motions?: MotionInfo[];
};

export type MotionInfo = {
  createdAt: number;
};
