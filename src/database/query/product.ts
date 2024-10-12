import {
  createProductSchema,
  updateProductSchema,
} from "@/features/product/__schema";
import { z } from "zod";
import { DB } from "..";
import { PRODUCT_SCHEMA } from "../schema";
import { eq, like, or } from "drizzle-orm";
import { F, pipe, S } from "@mobily/ts-belt";

export async function createProduct(
  payload: z.infer<typeof createProductSchema>
) {
  return await DB.insert(PRODUCT_SCHEMA).values(payload).$returningId();
}

export async function updateProduct({
  id,
  ...payload
}: Partial<z.infer<typeof updateProductSchema>> & { id: string }) {
  return await DB.update(PRODUCT_SCHEMA)
    .set(payload)
    .where(eq(PRODUCT_SCHEMA.id, id));
}

export async function getProducts(search = "") {
  let where = pipe(
    search,
    S.toLowerCase,
    S.replaceByRe(/s+/g, " "),
    F.ifElse(
      (s) => s.length > 0,
      (search) =>
        or(
          like(PRODUCT_SCHEMA.name, `%${search}%`),
          like(PRODUCT_SCHEMA.description, `%${search}%`)
        ),

      () => undefined
    )
  );

  return await DB.query.PRODUCT_SCHEMA.findMany({
    where,
    orderBy: (f, c) => c.desc(f.updatedAt),
  });
}

export async function deleteProduct(productId: string) {
  return await DB.delete(PRODUCT_SCHEMA).where(
    eq(PRODUCT_SCHEMA.id, productId)
  );
}
