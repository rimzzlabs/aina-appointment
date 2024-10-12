import { z } from "zod";

export let signUpSchema = z.object({
  name: z.string().min(1, "Nama lengkap tidak valid"),
  email: z.string().min(1, "Email tidak valid").email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 8 karakter"),
});
