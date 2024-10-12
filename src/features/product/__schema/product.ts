import { toInt } from "radash";
import { z } from "zod";

export let createProductSchema = z.object({
  name: z.string().min(1, "Harap isi nama produk"),
  description: z
    .string()
    .min(1, "Harap isi deskripsi produk")
    .max(255, "Maksimal deskripsi produk adalah 255 kata"),
  price: z.preprocess(
    (a) => toInt(a, 0),
    z.number().min(10_000, "Minimal harga produk adalah 20.000")
  ),
});

export let updateProductSchema = z.object({
  id: z.string().min(1, "ID Produk tidak valid"),
  name: z.string().min(1, "Harap isi nama produk"),
  description: z
    .string()
    .min(1, "Harap isi deskripsi produk")
    .max(255, "Maksimal deskripsi produk adalah 255 kata"),
  price: z.preprocess(
    (a) => toInt(a, 0),
    z.number().min(10_000, "Minimal harga produk adalah 20.000")
  ),
});
