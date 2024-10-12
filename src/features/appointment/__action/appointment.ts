"use server";

import { z } from "zod";
import {
  cancelAppointmentSchema,
  createAppointmentSchema,
  updateStatusAppointmentSchema,
} from "../__schema";
import { tryit } from "radash";
import {
  cancelAppointment,
  createAppointment,
  updateStatusAppointment,
} from "@/database/query/appointment";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(
  payload: z.infer<typeof createAppointmentSchema>
) {
  const [error] = await tryit(createAppointment)(payload);

  if (error) {
    console.info("(LOG ERR): createAppointmentAction ", error.message);
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/customer/appointment");
  return { data: "Berhasil" };
}

export async function cancelAppointmentAction(
  payload: z.infer<typeof cancelAppointmentSchema>
) {
  const [error] = await tryit(cancelAppointment)(payload);

  if (error) {
    console.info("(LOG ERR): cancelAppointmentAction ", error.message);
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/customer/appointment");
  return { data: "Berhasil" };
}

export async function updateStatusAppointmentAction(
  payload: z.infer<typeof updateStatusAppointmentSchema>
) {
  const [error] = await tryit(updateStatusAppointment)(payload);

  if (error) {
    console.info("(LOG ERR): cancelAppointmentAction ", error.message);
    return { error: "Terjadi kesalahan pada server" };
  }

  revalidatePath("/customer/appointment");
  return { data: "Berhasil" };
}
