import {
  AUTH_SIGNED,
  AUTH_ROUTES,
  AUTH_API_PREFIX,
  AUTH_SIGNIN_URL,
  PRIVATE_ROUTES,
  CUSTOMER_ROUTES,
  ADMIN_ROUTES,
} from "@/lib/auth";

import { A, pipe, S } from "@mobily/ts-belt";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "./lib/auth/config";

const { auth: middleware } = NextAuth(AUTH_CONFIG);

export default middleware(async (req) => {
  let session = req.auth?.user;
  let url = req.nextUrl;
  let redirectStatus = { status: 307 };

  let isPrivateRoutes = pipe(PRIVATE_ROUTES, A.includes(url.pathname));
  if (isPrivateRoutes && !session) {
    return NextResponse.redirect(new URL(AUTH_SIGNIN_URL, url), redirectStatus);
  }

  let isApiAuthRoute = pipe(url.pathname, S.includes(AUTH_API_PREFIX));
  if (isApiAuthRoute) {
    if (!session)
      return NextResponse.redirect(
        new URL(AUTH_SIGNIN_URL, url),
        redirectStatus
      );
    return NextResponse.next();
  }

  let isAuthRoutes = pipe(AUTH_ROUTES, A.includes(url.pathname));
  if (isAuthRoutes) {
    if (session) {
      return NextResponse.redirect(new URL(AUTH_SIGNED, url), redirectStatus);
    }
    return NextResponse.next();
  }

  let isCustomerTryingToAccessAdmin =
    session &&
    session.role === "customer" &&
    ADMIN_ROUTES.includes(url.pathname);

  if (isCustomerTryingToAccessAdmin) {
    return NextResponse.redirect(
      new URL("/customer/appointment", url),
      redirectStatus
    );
  }

  let isAdminTryingToAccessCustomer =
    session &&
    session.role === "admin" &&
    CUSTOMER_ROUTES.includes(url.pathname);
  if (isAdminTryingToAccessCustomer) {
    return NextResponse.redirect(
      new URL("/appointment/list", url),
      redirectStatus
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
