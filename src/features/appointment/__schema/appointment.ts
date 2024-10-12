import { APPOINTMENT_SEX, APPOINTMENT_SKIN_TYPES } from "@/lib/appointment";
import { toInt } from "radash";
import { z } from "zod";

const enumSkinTypes = [
  APPOINTMENT_SKIN_TYPES[0].value,
  APPOINTMENT_SKIN_TYPES[1].value,
  APPOINTMENT_SKIN_TYPES[2].value,
  APPOINTMENT_SKIN_TYPES[3].value,
  APPOINTMENT_SKIN_TYPES[4].value,
] as const;

const enumSex = [APPOINTMENT_SEX[0].value, APPOINTMENT_SEX[1].value] as const;
export let createAppointmentSchema = z.object({
  userId: z.string().min(1, "Sesi telah habis, coba refresh lagi"),
  doctorId: z
    .string({ required_error: "Harap pilih dokter" })
    .min(1, "Harap pilih dokter"),
  appointmentDate: z.date({
    required_error: "Harap pilih tanggal untuk pertemuan",
  }),
  age: z.preprocess(
    (a) => toInt(a, 0),
    z
      .number({ message: "Harap masukan umur" })
      .nonnegative("Umur tidak valid")
      .min(17, "Minimal umur 17 tahun keatas")
  ),
  sex: z.enum(enumSex, {
    required_error: "Harap pilih jenis kelamin",
    message: "Harap pilih jenis kelamin",
  }),
  skinType: z.enum(enumSkinTypes, {
    required_error: "Harap pilih jenis kulit",
    message: "Harap pilih jenis kulit",
  }),
  remark: z.string().max(255, "Maksimal 255 karakter").optional(),
});

export let cancelAppointmentSchema = z.object({
  userId: z.string().min(1, "ID User tidak valid"),
  appointmentId: z.string().min(1, "ID Appointment tidak valid"),
});

export let updateStatusAppointmentSchema = z.object({
  userId: z.string().min(1, "ID User tidak valid"),
  appointmentId: z.string().min(1, "ID Appointment tidak valid"),
  status: z.enum(["success", "rejected"], {
    required_error: "Status tidak valid",
  }),
});
