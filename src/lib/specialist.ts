import { match } from "ts-pattern";

export const DOCTOR_SPECIALIST = [
  { label: "Spesialis Estetika", value: "aesthetic" },
  { label: "Spesialis Kulit dan Kelamin", value: "dermatologist" },
] as const;

export function getSpecialistLabel(value: Doctor["specialist"]) {
  return match(value)
    .with("aesthetic", () => "Spesialis Estetika")
    .otherwise(() => "Spesialis Kulit dan Kelamin");
}
