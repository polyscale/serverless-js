import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "@polyscale/serverless-js",
      // the proper extensions will be added
      fileName: "serverless-js",
    },
    rollupOptions: {
      output: {},
    },
  },
});
