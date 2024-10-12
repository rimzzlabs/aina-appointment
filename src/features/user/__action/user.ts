"use server";

import {
  createUser,
  deleteUser,
  hashPassword,
  updateUser,
} from "@/database/query/user";
import { revalidatePath } from "next/cache";
import { tryit } from "radash";
import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../__schema";
import { D, pipe, S } from "@mobily/ts-belt";

export async function createUserAction(
  payload: z.infer<typeof createUserSchema>
) {
  const [error] = await tryit(createUser)(payload);

  if (error) {
    let isDuplicate = pipe(
      error.message,
      S.toLowerCase,
      S.includes("duplicate")
    );
    if (isDuplicate) {
      return { error: "duplicate found" } as const;
    }
    return { error: "server error" } as const;
  }

  revalidatePath("/user/list");
  return { data: "success" };
}

export async function deleteUserAction(userId: string) {
  const [error] = await tryit(deleteUser)(userId);
  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/user/list");
  return { data: "User berhasil dihapus" };
}

export async function updateUserAction(
  payload: z.infer<typeof updateUserSchema>
) {
  let payloadWithoutPassword = pipe(
    payload,
    D.selectKeys(["id", "email", "name"])
  );

  if (payload.skipPassword) {
    const [error] = await tryit(updateUser)(payloadWithoutPassword);

    if (error) {
      console.log("(LOG ERR): updateUserAction ", error.message);
      return { error: "server error" } as const;
    }

    revalidatePath("/user/list");
    return { id: payload.id };
  }

  let pwCheck = z
    .string()
    .min(6, "Minimal password 6 karakter atau lebih")
    .safeParse(payload?.password);

  if (pwCheck.error) {
    return { error: "invalid password" } as const;
  }

  let password = await hashPassword(pwCheck.data);
  let payloadWithPassword = pipe(
    payloadWithoutPassword,
    D.set("password", password)
  );
  const [error] = await tryit(updateUser)(payloadWithPassword);

  if (error) {
    console.log("(LOG ERR): updateUserAction ", error.message);
    return { error: "server error" } as const;
  }

  revalidatePath("/user/list");
  return { id: payload.id };
}
