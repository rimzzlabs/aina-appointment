import { getUserByEmail } from "@/database/query/user";
import { auth } from "@/lib/auth";

import { D, pipe } from "@mobily/ts-belt";
import { NextResponse } from "next/server";
import { tryit } from "radash";
import { z } from "zod";

export const GET = auth(async function GET(req) {
  let url = new URL(req.url);
  let rawEmail = url.searchParams.get("email");

  let parsed = z.string().min(1, "invalid email").email().safeParse(rawEmail);
  if (parsed.error) {
    return NextResponse.json(
      { error: "invalid email", data: null },
      { status: 400 }
    );
  }

  let email = parsed.data;
  const [error, user] = await tryit(getUserByEmail)(email);

  if (error) {
    return NextResponse.json(
      { error: "server error", data: null },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: "user not found", data: null },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      error: null,
      data: pipe(user, D.deleteKeys(["password", "createdAt", "updatedAt"])),
    },
    { status: 200 }
  );
});

export const runtime = "nodejs";
