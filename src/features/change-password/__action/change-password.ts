"use server";

import { changePassword } from "@/database/query/user";
import { tryit } from "radash";
import { z } from "zod";
import { changePasswordSchema } from "../__schema";

export async function changePasswordAction(
  payload: z.infer<typeof changePasswordSchema>
) {
  const [error, res] = await tryit(changePassword)(payload);

  if (error) {
    console.log("(LOG ERR): changePasswordAction ", error.message);
    return "Terjadi kesalahan pada server" as const;
  }
  if (res !== "success") return res;

  return res;
}
