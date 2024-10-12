import { signInSchema } from "@/features/auth/__schema";
import { verifyCredentials } from "@/lib/auth/verify";
import { D, pipe } from "@mobily/ts-belt";
import { NextRequest } from "next/server";
import { tryit } from "radash";

export async function POST(req: NextRequest) {
  try {
    let [err, body] = await tryit(req.json)();
    if (err) {
      return Response.json({ error: "invalid payload" }, { status: 422 });
    }
    if (!body) {
      return Response.json({ error: "invalid payload" }, { status: 422 });
    }

    let payload = signInSchema.safeParse(body);
    if (payload.error) {
      let error = payload.error.issues.map((is) => `${is.path} ${is.message}`);
      return Response.json({ error }, { status: 422 });
    }

    let res = await verifyCredentials(
      payload.data.email,
      payload.data.password
    );
    if (res === "server error") {
      return Response.json({ error: "server error" }, { status: 401 });
    }
    if (res === "deactivated") {
      return Response.json({ error: "deactivated" }, { status: 401 });
    }
    if (res === "not found") {
      return Response.json({ error: "not found user" }, { status: 404 });
    }
    if (res === "invalid password") {
      return Response.json(
        { error: "invalid email or password" },
        { status: 401 }
      );
    }

    return Response.json({
      data: pipe(res, D.selectKeys(["id", "email", "name", "image", "role"])),
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
