import { Client, models } from "../src/main";

const TARGET_URL = "https://example.com";
const CONFIG = {
  cacheId: "some-cache-id",
  username: "some-username",
  password: "some-password",
  database: "some-database",
  provider: "mysql" as (typeof models.SqlQueryRequest._type)["provider"],
};

const originalFetch = global.fetch;

(global.fetch as any) = jest.fn(() => ({
  json: jest.fn(),
}));

afterAll(() => {
  global.fetch = originalFetch;
});

test("@polyscale/serverless-js", async () => {
  const client = new Client(TARGET_URL, CONFIG);

  await client.query("SELECT 1;");

  expect(fetch).toHaveBeenCalledWith(TARGET_URL + "/sql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cacheId: CONFIG.cacheId,
      username: CONFIG.username,
      password: CONFIG.password,
      sql: "SELECT 1;",
      provider: CONFIG.provider,
      database: CONFIG.database,
    }),
  });
});
