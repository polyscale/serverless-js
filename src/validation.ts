import { z } from "zod";

const SqlQueryRequest = z.object({
  cacheId: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  sql: z.string().min(1),
  provider: z.enum(["postgres", "mysql", "mariadb", "mssql"]),
  database: z.string().min(1),
  ssl: z.boolean().optional(),
});

export type SqlQueryRequest = typeof SqlQueryRequest._type;

const SqlQueryReplySuccess = z.array(z.any());

export type SqlQueryRequestSuccess = typeof SqlQueryReplySuccess._type;

const SqlQueryReplyError = z.object({
  statusCode: z.number(),
  code: z.string(),
  error: z.string(),
  message: z.string(),
});

export type SqlQueryRequestError = typeof SqlQueryReplyError._type;

export const models = {
  SqlQueryRequest,
  SqlQueryReplySuccess,
  SqlQueryReplyError,
};
