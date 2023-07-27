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
  jest.resetAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("@polyscale/serverless-js", () => {
  test("Query without bindings", async () => {
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
        bindings: undefined,
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });
  });

  test("Query with bindings", async () => {
    const client = new Client(TARGET_URL, CONFIG);

    await client.query("SELECT ?;", [1]);
    await client.query("SELECT ?;", ["1"]);
    await client.query("SELECT ?;", [true]);
    await client.query("SELECT ?;", [null]);
    await client.query("SELECT ?;", [[1]]);
    await client.query("SELECT ?;", [["1"]]);
    await client.query("SELECT ?;", [[true]]);

    expect(fetch).toHaveBeenNthCalledWith(1, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [1],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(2, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: ["1"],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(3, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [true],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(4, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [null],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(5, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [[1]],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(6, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [["1"]],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });

    expect(fetch).toHaveBeenNthCalledWith(7, TARGET_URL + "/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cacheId: CONFIG.cacheId,
        username: CONFIG.username,
        password: CONFIG.password,
        sql: "SELECT ?;",
        bindings: [[true]],
        provider: CONFIG.provider,
        database: CONFIG.database,
      }),
    });
  });
});
