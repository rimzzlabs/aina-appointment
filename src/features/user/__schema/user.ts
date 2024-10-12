import { z } from "zod";

export let createUserSchema = z.object({
  name: z.string().min(1, "Masukan nama lengkap user"),
  email: z.string().min(1, "Masukan alamat email user"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z
    .enum(["customer", "admin"], { message: "Pilih role pengguna" })
    .default("customer"),
});

export let updateUserSchema = z
  .object({
    id: z.string().min(1, "Id tidak valid"),
    name: z.string().min(1, "Nama tidak boleh kosong"),
    email: z
      .string()
      .min(1, "Email tidak boleh kosong")
      .email("Email tidak valid"),
    password: z.string().optional(),
    skipPassword: z.boolean(),
  })
  .refine(
    (data) => data.skipPassword || (data.password && data.password.length >= 6),
    {
      message: "Password harus diisi jika tidak melewati",
      path: ["password"],
    }
  );
