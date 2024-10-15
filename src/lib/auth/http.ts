import { signInSchema } from "@/features/auth/__schema";
import { B, F, O, pipe, S } from "@mobily/ts-belt";
import { Session } from "next-auth";
import { match, P } from "ts-pattern";
import { z } from "zod";

function getBaseURL() {
  let isDev = process.env.NODE_ENV === "development";

  return pipe(
    isDev,
    B.ifElse(
      () => pipe("localhost:4321", S.prepend("http://")),
      () =>
        pipe(
          process.env.VERCEL_URL,
          O.fromNullable,
          O.mapWithDefault("aina-beauty.up.railway.app", F.identity),
          S.prepend("https://")
        )
    )
  );
}

export async function getUserByHttp(session: Session) {
  let baseURL = getBaseURL();
  let url = new URL("/api/user", baseURL);
  url.searchParams.append("email", session.user.email);

  return await fetch(url.toString(), { method: "GET", cache: "no-store" });
}

type TSigninResponse = {
  id: string;
  name: string;
  email: string;
  image: null | string;
  role: Role;
};
export async function signInViaHTTP(body: z.infer<typeof signInSchema>) {
  let baseURL = getBaseURL();
  let url = new URL("/api/signin", baseURL);

  let res = await fetch(url.toString(), {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let data = (await res.json()) as { error: string; data: undefined };

    console.info("signinViaHTTP err ", data);
    return match(data.error.toLowerCase())
      .with(
        P.string.includes("invalid payload"),
        () => "invalid payload" as const
      )
      .with(
        P.string.includes("email or password"),
        () => "invalid password" as const
      )
      .with(P.string.includes("deactivated"), () => "deactivated" as const)
      .with(P.string.includes("not found"), () => "not found" as const)
      .otherwise(() => "server error" as const);
  }

  let json = (await res.json()) as { data: TSigninResponse };
  return json.data;
}
