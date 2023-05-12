import { makeRequest } from "./request";
import { models } from "./validation";

export class Client {
  request: ReturnType<typeof makeRequest>;

  constructor(
    endpoint: string,
    private connection: Pick<
      typeof models.SqlQueryRequest._type,
      "cacheId" | "username" | "password" | "database" | "provider"
    >
  ) {
    this.request = makeRequest(endpoint + "/sql");
  }

  query = async <Data>(sql: string) => {
    const body = models.SqlQueryRequest.parse({ ...this.connection, sql });

    return this.request<Data>({
      ...body,
    });
  };
}

export * from "./validation";

export default Client;
