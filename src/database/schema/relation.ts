import { relations } from "drizzle-orm";
import { USER_SCHEMA } from "./user";
import { APPOINMENT_SCHEMA } from "./appointment";
import { DOCTOR_SCHEMA } from "./doctor";

export const USER_RELATION = relations(USER_SCHEMA, (r) => ({
  appointments: r.many(APPOINMENT_SCHEMA),
}));

export const DOCTOR_RELATION = relations(DOCTOR_SCHEMA, (r) => ({
  appointments: r.many(APPOINMENT_SCHEMA),
}));

export const APOINTMENT_RELATION = relations(APPOINMENT_SCHEMA, (r) => ({
  user: r.one(USER_SCHEMA, {
    fields: [APPOINMENT_SCHEMA.userId],
    references: [USER_SCHEMA.id],
  }),
  doctor: r.one(DOCTOR_SCHEMA, {
    fields: [APPOINMENT_SCHEMA.doctorId],
    references: [DOCTOR_SCHEMA.id],
  }),
}));
