import { match } from "ts-pattern";

export type AppointmentStatus =
  | "pending"
  | "cancelled"
  | "success"
  | "rejected"
  | "expired";

export const APPOINTMENT_SKIN_TYPES = [
  { label: "Jerawat", value: "acne" },
  { label: "Kombinasi", value: "combination" },
  { label: "Berminyak", value: "oily" },
  { label: "Kering", value: "dry" },
  { label: "Lainnya (belum tahu)", value: "other" },
] as const;

export const APPOINTMENT_SEX = [
  { label: "Pria", value: "male" },
  { label: "Wanita", value: "female" },
] as const;

export function getAppointmentStatus(status: AppointmentStatus) {
  return match(status)
    .with("cancelled", () => "Dibatalkan")
    .with("pending", () => "Diproses")
    .with("rejected", () => "Ditolak")
    .with("success", () => "Selesai")
    .with("expired", () => "Kedaluwarsa")
    .otherwise(() => "Tidak diketahui");
}
