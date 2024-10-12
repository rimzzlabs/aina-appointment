import { getUserByEmail } from "@/database/query/user";
import { D, pipe } from "@mobily/ts-belt";
import bcrypt from "bcryptjs";
import { tryit } from "radash";

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function verifyCredentials(email: string, password: string) {
  const [error, user] = await tryit(getUserByEmail)(email);

  if (error) return "server error" as const;
  if (!user) return "not found" as const;
  if (user.deleted) return "deactivated" as const;

  let isMatch = await verifyPassword(password, user.password);
  if (!isMatch) return "invalid password" as const;

  return pipe(user, D.deleteKey("password"));
}
