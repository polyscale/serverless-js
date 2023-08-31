# PolyScale Serverless Client

![npm (scoped)](https://img.shields.io/npm/v/@polyscale/serverless-js?color=%23b03348)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/polyscale/serverless-js/publish.yml)
![GitHub](https://img.shields.io/github/license/polyscale/serverless-js)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@polyscale/serverless-js)

`Serverless-js` is a lightweight, Fetch API based HTTP client designed for executing SQL over HTTP with PolyScale.ai. `Serverless-js` is intended for use in serverless environments where TCP based database connections are unavailable e.g. Vercel and Cloudflare Workers.

## Install

```
npm install @polyscale/serverless-js
```

## Usage

**TypeScript/ESM:**
```typescript
import {Client} from "@polyscale/serverless-js";

const polyscale = new Client("https://serverless.aws.psedge.global", {
    cacheId: "polyscale-cache-id",
    username: "target-db-username",
    password: "target-db-password",
    database: "target-db-database",
    provider: "mysql",
});

polyscale.query("SELECT 1;").then(result => console.log(result))
```

**Deno:**
```typescript
import {Client} from "npm:@polyscale/serverless-js";

const polyscale = new Client("https://serverless.aws.psedge.global", {
    cacheId: "polyscale-cache-id",
    username: "target-db-username",
    password: "target-db-password",
    database: "target-db-database",
    provider: "mysql",
});

polyscale.query("SELECT 1;").then(result => console.log(result))
```

Commonjs: 
```javascript
const {Client} = require("@polyscale/serverless-js");

const polyscale = new Client("https://serverless.aws.psedge.global", {
    cacheId: "polyscale-cache-id",
    username: "target-db-username",
    password: "target-db-password",
    database: "target-db-database",
    provider: "mysql",
});

polyscale.query("SELECT 1;").then(result => console.log(result))
```

## Parameter Bindings

See [knex documentation](https://knexjs.org/guide/raw.html#raw-parameter-binding) for more information.

```typescript
import {Client} from "@polyscale/serverless-js";

const polyscale = new Client("https://serverless.aws.psedge.global", {
    cacheId: "polyscale-cache-id",
    username: "target-db-username",
    password: "target-db-password",
    database: "target-db-database",
    provider: "mysql",
});

polyscale.query("SELECT * FROM user WHERE name = ?;", ["Peter"]).then(result => console.log(result))
polyscale.query("SELECT * FROM user WHERE name = :name;", {name: "Peter"}).then(result => console.log(result))
```

## Examples

* [Cloudflare Worker](./examples/cloudflare-worker/)
* [Vercel Edge Functions](./examples/vercel-next/)