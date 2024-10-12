import { N, pipe } from "@mobily/ts-belt";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { ACCOUNT_SCHEMA, USER_SCHEMA } from "@/database/schema/user";
import { AUTH_CONFIG } from "./config";
import { DB } from "@/database";

const MAX_AGE = pipe(
  7,
  N.multiply(24),
  N.multiply(60),
  N.multiply(60),
  N.multiply(1000)
);

export const AUTH_SIGNED = "/appointment/list";
export const AUTH_SIGNIN_URL = "/";
export const AUTH_API_PREFIX = "/api/auth";
export const AUTH_PUBLIC_ROUTES = ["/"];
export const AUTH_ROUTES = [AUTH_SIGNIN_URL];

export const ADMIN_ROUTES = [
  "/user/list",
  "/service/list",
  "/appointment/list",
  "/doctor/list",
];

export const CUSTOMER_ROUTES = [
  "/customer/appointment",
  "/customer/service",
  "/customer/doctor",
];

export const PRIVATE_ROUTES = [
  ...ADMIN_ROUTES,
  ...CUSTOMER_ROUTES,
  "/change-password",
];

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  jwt: { maxAge: MAX_AGE },
  pages: { signIn: "/" },
  session: { strategy: "jwt", maxAge: MAX_AGE },
  adapter: DrizzleAdapter(DB, {
    usersTable: USER_SCHEMA,
    accountsTable: ACCOUNT_SCHEMA,
  }),
  ...AUTH_CONFIG,
});
