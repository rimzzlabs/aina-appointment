import { onUpdateSchemaFn } from "@/lib/utils";
import {
  timestamp,
  mysqlTable,
  varchar,
  primaryKey,
  int,
  boolean,
} from "drizzle-orm/mysql-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const USER_SCHEMA = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),

  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),

  password: varchar("password", { length: 255 }).notNull(),

  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 80 }).$type<Role>().notNull(),

  deleted: boolean("deleted").notNull().default(false),

  updatedAt: timestamp("updated_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .$onUpdateFn(onUpdateSchemaFn)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string", fsp: 3 })
    .defaultNow()
    .notNull(),
});

export const ACCOUNT_SCHEMA = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => USER_SCHEMA.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
