import { onUpdateSchemaFn } from "@/lib/utils";
import { varchar, timestamp, mysqlTable, int } from "drizzle-orm/mysql-core";

export const PRODUCT_SCHEMA = mysqlTable("product", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  price: int("price")
    .notNull()
    .$defaultFn(() => 60_000),

  updatedAt: timestamp("updated_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .$onUpdateFn(onUpdateSchemaFn)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .notNull(),
});
