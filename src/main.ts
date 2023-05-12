import { makeRequest } from "./request";
import { models } from "./validation";

export class Client {
  request: ReturnType<typeof makeRequest>;

  constructor(
    endpoint: string,
    private connection: Pick<
      typeof models.SqlQueryRequest._type,
      "cacheId" | "username" | "password" | "database" | "provider"
    >,
    fetchFn?: (
      input: RequestInfo | URL,
      init?: RequestInit | undefined
    ) => Promise<Response>
  ) {
    if (!fetchFn) {
      console.log(
        "@polyscale/serverless-js – defaulting to use fetch. Provide fetchFn to override default behaviour."
      );
    }

    if (!fetch && !fetchFn) {
      throw new Error(
        "fetch is undefined. Please provide a fetch implementation."
      );
    }

    this.request = makeRequest(endpoint + "/sql", fetchFn);
  }

  query = async <Data>(sql: string) => {
    const body = models.SqlQueryRequest.parse({ ...this.connection, sql });

    return this.request<Data>({
      ...body,
    });
  };
}

export * from "./validation";
