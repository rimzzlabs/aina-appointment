import { onUpdateSchemaFn } from "@/lib/utils";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const SERVICE_SCHEMA = mysqlTable("service", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),

  updatedAt: timestamp("updated_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .$onUpdateFn(onUpdateSchemaFn)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .notNull(),
});
