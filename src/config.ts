import * as dotenv from "dotenv";

dotenv.config();

const config = {
  remo_token: process.env["REMO_TOKEN"] ?? "",
};

export default config;
