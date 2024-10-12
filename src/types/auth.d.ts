import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: Role;
      email: string;
      deactivated?: boolean;
    } & DefaultSession["user"];
  }
}
