import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

import { Client } from "../../../../../src/main";

const polyscale = new Client("https://serverless.aws.polyscale.global", {
  cacheId: "CACHE_ID",
  username: "USERNAME",
  password: "PASSWORD",
  database: "DATABASE",
  provider: "mysql",
});

const handler = async () => {
  const result = await polyscale.query("SELECT 1;");

  return NextResponse.json(result);
};

export default handler;
