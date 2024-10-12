import { z } from "zod";

export let createServiceSchema = z.object({
  name: z.string().min(1, "Nama layanan tidak valid"),
  description: z.string().min(1, "Deskripsi layanan tidak valid"),
});

export let updateServiceSchema = z.object({
  id: z.string().min(1, "ID Layanan tidak valid"),
  name: z.string().min(1, "Nama layanan tidak valid"),
  description: z.string().min(1, "Deskripsi layanan tidak valid"),
});
