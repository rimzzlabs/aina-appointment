import { F, pipe, S } from "@mobily/ts-belt";
import { DB } from "..";
import { eq, like, or } from "drizzle-orm";
import { SERVICE_SCHEMA } from "../schema";
import { z } from "zod";
import {
  createServiceSchema,
  updateServiceSchema,
} from "@/features/services/__schema";

export async function getServices(search = "") {
  let where = pipe(
    search,
    S.toLowerCase,
    S.replaceByRe(/s+/g, ""),
    F.ifElse(
      (s) => s.length > 0,
      (search) =>
        or(
          like(SERVICE_SCHEMA.name, `%${search}%`),
          like(SERVICE_SCHEMA.description, `%${search}%`)
        ),
      () => undefined
    )
  );
  return await DB.query.SERVICE_SCHEMA.findMany({
    where,
    orderBy: (f, c) => c.desc(f.createdAt),
  });
}

export async function createService(
  payload: z.infer<typeof createServiceSchema>
) {
  await DB.insert(SERVICE_SCHEMA).values(payload);

  return payload;
}

export async function updateService({
  id,
  ...payload
}: z.infer<typeof updateServiceSchema>) {
  await DB.update(SERVICE_SCHEMA).set(payload).where(eq(SERVICE_SCHEMA.id, id));

  return { id };
}

export async function deleteService(id: string) {
  await DB.delete(SERVICE_SCHEMA).where(eq(SERVICE_SCHEMA.id, id));
  return { id };
}
