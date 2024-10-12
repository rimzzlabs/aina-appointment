"use server";

import { z } from "zod";
import { createDoctorSchema, updateDoctorSchema } from "../__schema";
import { tryit } from "radash";
import {
  createDoctor,
  deleteDoctor,
  updateDoctor,
} from "@/database/query/doctor";
import { revalidatePath } from "next/cache";

export async function createDoctorAction(
  payload: z.infer<typeof createDoctorSchema>
) {
  const [error, res] = await tryit(createDoctor)(payload);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/doctor/list");
  return { data: res.name };
}

export async function updateDoctorAction(
  payload: z.infer<typeof updateDoctorSchema>
) {
  const [error, res] = await tryit(updateDoctor)(payload);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/doctor/list");
  return { data: res.name };
}

export async function deleteDoctorAction(id: string) {
  const [error] = await tryit(deleteDoctor)(id);

  if (error) {
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/doctor/list");
  return { id };
}
