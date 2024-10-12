import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@/lib/env-server";
import { defineConfig } from "drizzle-kit";
import { toInt } from "radash";

export default defineConfig({
  dialect: "mysql",
  out: "./drizzle",
  schema: "./src/database/schema",
  dbCredentials: {
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: toInt(DB_PORT, 0),
  },
});
