import { makeRequest } from "./request";
import { SqlQueryRequest, models } from "./validation";

export class Client {
  request: ReturnType<typeof makeRequest>;

  constructor(
    endpoint: string,
    private connection: Pick<
      SqlQueryRequest,
      "cacheId" | "username" | "password" | "database"
    >,
    fetchFn = fetch
  ) {
    if (!fetch && !fetchFn) {
      throw new Error(
        "@polyscale/serverless-js – fetch is undefined. Please provide a fetch implementation."
      );
    }

    this.request = makeRequest(endpoint + "/sql", fetchFn);
  }

  query = async <Data>(
    sql: SqlQueryRequest["sql"],
    bindings?: SqlQueryRequest["bindings"]
  ) => {
    const body = models.SqlQueryRequest.parse({
      ...this.connection,
      sql,
      bindings,
    });

    return this.request<Data>({
      ...body,
    });
  };
}

export * from "./validation";
