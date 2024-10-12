import { signInSchema } from "@/features/auth/__schema";
import { D, pipe } from "@mobily/ts-belt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByHttp } from "./http";
import { verifyCredentials } from "./verify";

export const AUTH_CONFIG = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", placeholder: "Alamat surel anda" },
        password: { type: "password", placeholder: "Kata sandi Anda" },
      },
      authorize: async (credentials) => {
        let parsedCredentials = signInSchema.safeParse(credentials);
        if (parsedCredentials.error) {
          return null;
        }

        let payload = parsedCredentials.data;
        let res = await verifyCredentials(payload.email, payload.password);

        if (
          res === "not found" ||
          res === "invalid password" ||
          res === "deactivated" ||
          res === "server error"
        ) {
          return null;
        }

        return pipe(
          res,
          D.selectKeys(["id", "email", "name", "image", "role"])
        );
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      let res = await getUserByHttp(session);

      if (!res.ok) {
        console.info("(LOG ERR) auth.session() failed to fetch");
        session.user.deactivated = true;
        return session;
      }

      type TResponse =
        | { error: null; data: User }
        | { error: string; data: null };
      let data = (await res.json()) as TResponse;

      if (data.error) {
        console.info("(LOG ERR) auth.session() error: ", data.error);
        return session;
      }

      let user = data.data;
      if (!user) {
        console.info("(LOG ERR) auth.session() err not ok: user not found");
        session.user.deactivated = true;
        return session;
      }

      session.user.id = user.id;
      session.user.role = user.role;
      session.user.name = user.name;
      session.user.deactivated = false;
      session.user.email = user.email;

      return session;
    },
  },
} satisfies NextAuthConfig;
