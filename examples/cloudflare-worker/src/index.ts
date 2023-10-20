/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Client } from "@polyscale/serverless-js";

const polyscale = new Client("https://serverless.aws.polyscale.global", {
  cacheId: "CACHE_ID",
  username: "USERNAME",
  password: "PASSWORD",
  database: "DATABASE",
  provider: "mysql",
});

export default {
  async fetch(): Promise<Response> {
    const result = await polyscale.query("SELECT 1;");

    return new Response(JSON.stringify(result));
  },
};
