// rollup.config.js
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/main.ts",
  plugins: [typescript()],
  external: ["node-fetch", "zod"],
  output: [
    {
      format: "cjs",
      file: "dist/serverless-js.cjs.js",
    },
    {
      format: "esm",
      file: "dist/serverless-js.js",
    },
  ],
});
