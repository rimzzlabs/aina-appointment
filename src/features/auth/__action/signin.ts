"use server";

import { z } from "zod";
import { signInSchema } from "../__schema";
import { signIn } from "@/lib/auth";
import { getUserByEmail } from "@/database/query/user";
import { S } from "@mobily/ts-belt";
import { AuthError } from "next-auth";
import { match } from "ts-pattern";

export async function signInAction(payload: z.infer<typeof signInSchema>) {
  try {
    let user = await getUserByEmail(payload.email);
    if (!user) return { error: "Email atau kata sandi tidak valid" };

    let redirectTo = match(user.role)
      .with("admin", () => "/appointment/list")
      .otherwise(() => "/customer/appointment");
    await signIn("credentials", { redirect: true, redirectTo, ...payload });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau Kata sandi tidak valid" };
        case "CallbackRouteError":
          return match(S.toLowerCase(error.message))
            .with("deactivated error", () => ({
              error: "User ini telah dinonaktifkan",
            }))
            .otherwise(() => ({
              error: "Tidak dapat masuk, periksa koneksi internet anda",
            }));
        default:
          return { error: "Terjadi kesalahan pada server" };
      }
    }

    throw error;
  }
}
