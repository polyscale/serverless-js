import fetch from "node-fetch";
import { models } from "./validation";

export const makeRequest =
  (url: string) =>
  async <Data>(body: typeof models.SqlQueryRequest._type) => {
    const response = await fetch(url, {
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
