// rollup.config.js
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-ts";

export default defineConfig({
  input: "src/main.ts",
  plugins: [typescript()],
  external: ["zod"],
  output: [
    {
      format: "cjs",
      file: "dist/serverless-js.cjs",
    },
    {
      format: "esm",
      file: "dist/serverless-js.mjs",
    },
  ],
});
