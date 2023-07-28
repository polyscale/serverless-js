# Cloudflare Worker Example

This example demonstrates how to use `@polyscale/serverless-js` on Cloudflare Workers.

```typescript
import { Client } from "@polyscale/serverless-js";

const polyscale = new Client("https://serverless.aws.polyscale.global", {
  cacheId: "CACHE_ID",
  username: "USERNAME",
  password: "PASSWORD",
  database: "DATABASE",
});

export default {
  async fetch(): Promise<Response> {
    const result = await polyscale.query("SELECT 1;");

    return new Response(JSON.stringify(result));
  },
};
```