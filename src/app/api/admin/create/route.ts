import { DB } from "@/database";
import { createUser } from "@/database/query/user";
import { createUserSchema } from "@/features/user/__schema";
import { NextRequest } from "next/server";
import { tryit } from "radash";

async function isUserExist() {
  let users = await DB.query.USER_SCHEMA.findMany({
    where: (user, clause) => clause.eq(user.role, "admin"),
    limit: 5,
  });

  return users.length > 0;
}

export async function GET(req: NextRequest) {
  let hasAdmin = await isUserExist();
  if (hasAdmin) {
    return Response.json({ error: "Admin sudah ada" });
  }

  let url = new URL(req.url);
  let name = url.searchParams.get("name");
  let email = url.searchParams.get("email");
  let password = url.searchParams.get("password");
  let role = url.searchParams.get("role");

  let data = createUserSchema.safeParse({ name, email, password, role });

  if (data.error) {
    return Response.json({
      error: data.error.issues.map((is) => `${is.message} at ${is.path[0]}`),
    });
  }

  const [error, res] = await tryit(createUser)(data.data);

  if (error || !res) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }

  return Response.json({ data: "Sukses" });
}
