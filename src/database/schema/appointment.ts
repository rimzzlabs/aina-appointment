import {
  datetime,
  mysqlTable,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { USER_SCHEMA } from "./user";
import { DOCTOR_SCHEMA } from "./doctor";
import { onUpdateSchemaFn } from "@/lib/utils";

const statusEnum = [
  "cancelled",
  "pending",
  "rejected",
  "success",
  "expired",
] as const;

export const APPOINMENT_SCHEMA = mysqlTable("appoinment", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  userId: varchar("user_id", { length: 255 }).references(() => USER_SCHEMA.id),
  doctorId: varchar("doctor_id", { length: 255 }).references(
    () => DOCTOR_SCHEMA.id
  ),
  appointmentDate: datetime("appointment_date", {
    mode: "string",
    fsp: 3,
  }).notNull(),

  status: text("status", { enum: statusEnum }).notNull().default("pending"),
  age: tinyint("age").notNull(),

  remark: varchar("remark", { length: 255 }),

  updatedAt: timestamp("updated_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .$onUpdateFn(onUpdateSchemaFn)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .notNull(),
});
