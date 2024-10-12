import {
  cancelAppointmentSchema,
  createAppointmentSchema,
  updateStatusAppointmentSchema,
} from "@/features/appointment/__schema";
import { z } from "zod";
import { DB } from "..";
import { APPOINMENT_SCHEMA } from "../schema/appointment";
import { formatDateToMySqlString } from "@/lib/utils";
import { F, pipe, S } from "@mobily/ts-belt";
import { and, eq, like, or } from "drizzle-orm";
import { match, P } from "ts-pattern";
import { isBefore, parseISO } from "date-fns";
import { AppointmentStatus } from "@/lib/appointment";
import { toZonedTime } from "date-fns-tz";

let timeZone = "Asia/Jakarta";

export async function getUserAppointment(userId: string, search = "") {
  let where = pipe(
    search,
    S.toLowerCase,
    S.replaceByRe(/s+/g, ""),
    F.ifElse(
      (s) => s.length > 0,
      (search) =>
        or(
          like(APPOINMENT_SCHEMA.status, `%${search}%`),
          like(APPOINMENT_SCHEMA.remark, `%${search}%`)
        ),
      () => undefined
    )
  );

  let res = await DB.query.APPOINMENT_SCHEMA.findMany({
    with: {
      doctor: {
        columns: { name: true, specialist: true, availableDates: true },
      },
      user: {
        columns: {
          name: true,
          role: true,
          email: true,
          deleted: true,
          createdAt: true,
        },
      },
    },
    orderBy: (f, c) => c.desc(f.createdAt),
    where: (f, c) => {
      return match(where)
        .with(P.nullish, () => c.eq(f.userId, userId))
        .otherwise((where) => c.and(c.eq(f.userId, userId), where));
    },
  });

  let today = toZonedTime(new Date(), timeZone);
  let promises = res.map(async (appo) => {
    let appointmentDateStr = appo.appointmentDate.replace(" ", "T");
    let appointmentDate = toZonedTime(parseISO(appointmentDateStr), timeZone, {
      timeZone: "GMT",
    });

    if (isBefore(today, appointmentDate)) return appo;

    await DB.update(APPOINMENT_SCHEMA)
      .set({ status: "expired" })
      .where(eq(APPOINMENT_SCHEMA.id, appo.id));
    return { ...appo, status: "expired" as AppointmentStatus };
  });

  let appointments = await Promise.all(promises);

  return appointments;
}

export async function getAppointments(search = "") {
  let where = pipe(
    search,
    S.toLowerCase,
    S.replaceByRe(/s+/g, ""),
    F.ifElse(
      (s) => s.length > 0,
      (search) =>
        or(
          like(APPOINMENT_SCHEMA.status, `%${search}%`),
          like(APPOINMENT_SCHEMA.remark, `%${search}%`)
        ),
      () => undefined
    )
  );

  let res = await DB.query.APPOINMENT_SCHEMA.findMany({
    with: {
      doctor: {
        columns: { name: true, specialist: true, availableDates: true },
      },
      user: {
        columns: {
          name: true,
          role: true,
          email: true,
          deleted: true,
          createdAt: true,
        },
      },
    },
    where,
    orderBy: (f, c) => c.desc(f.createdAt),
  });

  let today = toZonedTime(new Date(), timeZone);
  let promises = res.map(async (appo) => {
    let appointmentDateStr = appo.appointmentDate.replace(" ", "T");
    let appointmentDate = toZonedTime(parseISO(appointmentDateStr), timeZone, {
      timeZone: "GMT",
    });

    if (isBefore(today, appointmentDate)) return appo;

    await DB.update(APPOINMENT_SCHEMA)
      .set({ status: "expired" })
      .where(eq(APPOINMENT_SCHEMA.id, appo.id));
    return { ...appo, status: "expired" as AppointmentStatus };
  });

  let appointments = await Promise.all(promises);

  return appointments;
}

export async function createAppointment(
  data: z.infer<typeof createAppointmentSchema>
) {
  await DB.insert(APPOINMENT_SCHEMA).values({
    age: data.age,
    remark: data.remark,
    doctorId: data.doctorId,
    userId: data.userId,
    appointmentDate: formatDateToMySqlString(data.appointmentDate),
  });
}

export async function cancelAppointment(
  payload: z.infer<typeof cancelAppointmentSchema>
) {
  await DB.update(APPOINMENT_SCHEMA)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(APPOINMENT_SCHEMA.id, payload.appointmentId),
        eq(APPOINMENT_SCHEMA.userId, payload.userId)
      )
    );

  return { id: payload.appointmentId };
}

export async function updateStatusAppointment(
  payload: z.infer<typeof updateStatusAppointmentSchema>
) {
  await DB.update(APPOINMENT_SCHEMA)
    .set({ status: payload.status })
    .where(
      and(
        eq(APPOINMENT_SCHEMA.id, payload.appointmentId),
        eq(APPOINMENT_SCHEMA.userId, payload.userId)
      )
    );

  return { id: payload.appointmentId };
}
