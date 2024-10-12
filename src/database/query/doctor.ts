import { F, pipe, S } from "@mobily/ts-belt";
import { DB } from "..";
import { and, eq, like, or } from "drizzle-orm";
import { DOCTOR_SCHEMA } from "../schema";
import { z } from "zod";
import {
  createDoctorSchema,
  updateDoctorSchema,
} from "@/features/doctor/__schema";

export async function getDoctors(search = "") {
  let where = pipe(
    search,
    S.toLowerCase,
    S.replaceByRe(/s+/g, ""),
    F.ifElse(
      (s) => s.length > 0,
      (search) =>
        and(
          eq(DOCTOR_SCHEMA.deleted, false),
          or(
            like(DOCTOR_SCHEMA.name, `%${search}%`),
            like(DOCTOR_SCHEMA.specialist, `%${search}%`)
          )
        ),
      () => eq(DOCTOR_SCHEMA.deleted, false)
    )
  );

  return await DB.query.DOCTOR_SCHEMA.findMany({
    where,
    orderBy: (f, c) => c.desc(f.createdAt),
  });
}

export async function createDoctor(
  payload: z.infer<typeof createDoctorSchema>
) {
  await DB.insert(DOCTOR_SCHEMA).values(payload);

  return payload;
}

export async function updateDoctor({
  id,
  ...payload
}: z.infer<typeof updateDoctorSchema>) {
  await DB.update(DOCTOR_SCHEMA).set(payload).where(eq(DOCTOR_SCHEMA.id, id));

  return payload;
}

export async function deleteDoctor(id: string) {
  await DB.update(DOCTOR_SCHEMA)
    .set({ deleted: true })
    .where(eq(DOCTOR_SCHEMA.id, id));
  return { id };
}
