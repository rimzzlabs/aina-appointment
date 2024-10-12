"use server";

import { z } from "zod";
import { createServiceSchema, updateServiceSchema } from "../__schema";
import { tryit } from "radash";
import {
  createService,
  deleteService,
  updateService,
} from "@/database/query/service";
import { revalidatePath } from "next/cache";

export async function createServiceAction(
  payload: z.infer<typeof createServiceSchema>
) {
  const [error, res] = await tryit(createService)(payload);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/service/list");
  return { data: res.name };
}

export async function updateServiceAction(
  payload: z.infer<typeof updateServiceSchema>
) {
  const [error, res] = await tryit(updateService)(payload);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/service/list");
  return { data: res.id };
}

export async function deleteServiceAction(id: string) {
  const [error] = await tryit(deleteService)(id);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/service/list");
  return { id };
}
