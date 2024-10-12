"use server";

import { z } from "zod";
import { signUpSchema } from "../__schema";
import { tryit } from "radash";
import { createUser } from "@/database/query/user";
import { match, P } from "ts-pattern";

export async function signUpAction(payload: z.infer<typeof signUpSchema>) {
  const [error] = await tryit(createUser)({
    ...payload,
    role: "customer",
  });
  if (error) {
    let errorMessage = match(error.message.toLowerCase())
      .with(
        P.string.includes("duplicate"),
        () => "Email ini sudah terdaftar" as const
      )
      .otherwise(() => "Terjadi kesalahan pada server" as const);
    return { error: errorMessage, data: null };
  }

  return { error: null, data: payload };
}
