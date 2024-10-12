import { z } from "zod";

export let changePasswordSchema = z
  .object({
    id: z.string().min(1, "ID tidak valid"),
    oldPassword: z.string().min(1, "Password tidak valid"),
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
  })
  .refine(({ oldPassword, newPassword }) => oldPassword !== newPassword, {
    message: "Password baru tidak boleh sama dengan password lama",
    path: ["newPassword"],
  });
