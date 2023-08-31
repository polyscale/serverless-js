import { z } from "zod";

const BindingValue = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.string()),
  z.array(z.number()),
  z.array(z.boolean()),
]);

export type BindingValue = typeof BindingValue._type;

const SqlQueryRequest = z.object({
  cacheId: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  sql: z.string().min(1),
  bindings: z.record(BindingValue).or(z.array(BindingValue)).optional(),
  provider: z.enum(["postgres", "mysql", "mariadb", "mssql"]),
  database: z.string().min(1),
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
