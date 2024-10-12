import { type Pool, createPool } from "mysql2/promise";

import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@/lib/env-server";
import { toInt } from "radash";

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const connection =
  globalForDb.conn ??
  createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: toInt(DB_PORT, 0),
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = connection;

export const DB = drizzle(connection, {
  schema,
  mode: "default",
});
