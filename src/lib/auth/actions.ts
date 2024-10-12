"use server";

import { signOut } from "./index";

export async function signOutAction() {
  await signOut({ redirect: true, redirectTo: "/" });
}
