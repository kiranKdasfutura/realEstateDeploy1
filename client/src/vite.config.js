import { defineConfig } from "vite";
import dotenv from "dotenv";

export default ({ mode }) => {
  return defineConfig({
    plugins: [dotenv({})],
  });
};
