import { eq } from "drizzle-orm";
import { USER_SCHEMA } from "../schema";
import { DB } from "..";
import { createUserSchema } from "@/features/user/__schema";
import { z } from "zod";
import { omit } from "radash";
import { D } from "@mobily/ts-belt";
import bcrypt from "bcryptjs";
import { changePasswordSchema } from "@/features/change-password/__schema";
import { verifyPassword } from "@/lib/auth/verify";

const SALT = 12;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}

export async function getUserByEmail(email: string) {
  let user = await DB.query.USER_SCHEMA.findFirst({
    where: eq(USER_SCHEMA.email, email),
  });
  return user ?? null;
}

export async function createUser(payload: z.infer<typeof createUserSchema>) {
  let user = omit(payload, ["password"]);
  let password = await hashPassword(payload.password);

  let values = D.merge(user, { password });

  let [data] = await DB.insert(USER_SCHEMA).values(values).$returningId();

  return data;
}

export async function changePassword(
  payload: z.infer<typeof changePasswordSchema>
) {
  let user = await DB.query.USER_SCHEMA.findFirst({
    where: (user, clause) => clause.eq(user.id, payload.id),
  });
  if (!user) return "user not found" as const;

  let isPasswordMatch = await verifyPassword(
    payload.oldPassword,
    user.password
  );

  if (!isPasswordMatch) return "invalid old password" as const;

  let password = await bcrypt.hash(payload.newPassword, SALT);
  await DB.update(USER_SCHEMA)
    .set({ password })
    .where(eq(USER_SCHEMA.id, payload.id));

  return "success" as const;
}

export async function getUsers(search = "") {
  let lowerSearch = search.toLowerCase();

  return await DB.query.USER_SCHEMA.findMany({
    with: { appointments: { with: { doctor: true, user: true } } },
    orderBy: (user, op) => op.desc(user.createdAt),
    where: (user, clause) => {
      return clause.and(
        clause.eq(user.deleted, false),
        clause.eq(user.role, "customer"),
        clause.or(
          clause.like(user.name, `%${lowerSearch}%`),
          clause.like(user.email, `%${lowerSearch}%`)
        )
      );
    },
  });
}

export async function updateUser(
  payload: Partial<typeof USER_SCHEMA.$inferInsert> & { id: string }
) {
  await DB.update(USER_SCHEMA)
    .set({
      name: payload.name,
      password: payload.password,
      role: payload.role,
      email: payload.email,
    })
    .where(eq(USER_SCHEMA.id, payload.id));

  return { data: { userId: payload.id } };
}

export async function deleteUser(id: string) {
  await DB.update(USER_SCHEMA)
    .set({ deleted: true })
    .where(eq(USER_SCHEMA.id, id));
  return { data: "Success" };
}
