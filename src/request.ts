import { models } from "./validation";

export const makeRequest =
  (
    url: string,
    fetchFn?: (
      input: RequestInfo | URL,
      init?: RequestInit | undefined
    ) => Promise<Response>
  ) =>
  async <Data>(body: typeof models.SqlQueryRequest._type) => {
    const req = fetchFn ?? fetch;

    const response = await req(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = (await response.json()) as Array<Data>;

    if (response.status >= 400) {
      throw json;
    }

    return json;
  };
