import { z } from "zod";

export let signInSchema = z.object({
  email: z.string().min(1, "Mohon inputkan email").email("Email tidak valid"),
  password: z.string().min(1, "Mohon inputkan password"),
});
