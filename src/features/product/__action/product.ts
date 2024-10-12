"use server";

import { z } from "zod";
import { createProductSchema, updateProductSchema } from "../__schema";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/database/query/product";
import { revalidatePath } from "next/cache";
import { tryit } from "radash";

export async function createProductAction(
  payload: z.infer<typeof createProductSchema>
) {
  const [error, product] = await tryit(createProduct)(payload);

  if (error) {
    return { error: "Server error" };
  }

  revalidatePath("/product/list");
  return { data: product };
}

export async function updateProductAction(
  payload: z.infer<typeof updateProductSchema>
) {
  const [error] = await tryit(updateProduct)(payload);

  if (error) {
    return { error: "Server error" };
  }

  revalidatePath("/product/list");
  return { data: { id: payload.id } };
}

export async function deleteProductAction(productId: string) {
  console.info("PRODUCT ID =>", productId);
  const [error] = await tryit(deleteProduct)(productId);

  if (error) {
    return { error: "Server error" };
  }

  revalidatePath("/product/list");
  return { data: { id: productId } };
}
