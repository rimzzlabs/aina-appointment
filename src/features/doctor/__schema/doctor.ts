import { DOCTOR_SPECIALIST } from "@/lib/specialist";

import { z } from "zod";

const specialists = [
  DOCTOR_SPECIALIST[0].value,
  DOCTOR_SPECIALIST[1].value,
] as const;

export let createDoctorSchema = z.object({
  name: z.string().min(1, "Nama tidak valid"),
  specialist: z.enum(specialists, {
    message: "Harap pilih salah satu spesialisasi",
  }),
  availableDates: z.array(z.number()).min(1, "Harap pilih ketersediaan"),
});

export let updateDoctorSchema = z.object({
  id: z.string().min(1, "ID Dokter tidak valid"),
  name: z.string().min(1, "Nama tidak valid"),
  specialist: z.enum(specialists, {
    message: "Harap pilih salah satu spesialisasi",
  }),
  availableDates: z.array(z.number()).min(1, "Harap pilih ketersediaan"),
});
