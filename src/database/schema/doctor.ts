import { DOCTOR_SPECIALIST } from "@/lib/specialist";
import { onUpdateSchemaFn } from "@/lib/utils";
import {
  boolean,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const specialists = [
  DOCTOR_SPECIALIST[0].value,
  DOCTOR_SPECIALIST[1].value,
] as const;
export const DOCTOR_SCHEMA = mysqlTable("doctor", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  specialist: varchar("specialist", {
    length: 120,
    enum: specialists,
  }).notNull(),

  availableDates: json("available_dates").$type<Array<number>>().notNull(),
  deleted: boolean("deleted").default(false),

  updatedAt: timestamp("updated_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .$onUpdateFn(onUpdateSchemaFn)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .notNull(),
});
