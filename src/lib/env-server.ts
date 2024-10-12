import { z } from "zod";

let envSchema = z.object({
  DB_HOST: z.string().min(1, "Missing ENV DB_HOST"),
  DB_USER: z.string().min(1, "Missing ENV DB_USER"),
  DB_PASSWORD: z.string().min(1, "Missing ENV DB_PASSWORD"),
  DB_NAME: z.string().min(1, "Missing ENV DB_NAME"),
  DB_PORT: z.string().min(1, "Missing ENV DB_PORT"),
  AUTH_SECRET: z.string().min(1, "Missing ENV AUTH_SECRET"),
});

let check = envSchema.safeParse(process.env);

if (check.error) {
  throw new Error(`Error trying to access ENV: ` + check.error.message);
}

export const { AUTH_SECRET, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } =
  check.data;
