import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aina Jadwal Janji Temu",
  description: "Web Aplikasi Jadwal Janji Temu di Aina",
};

export default async function RootLayout(props: PropsWithChildren) {
  let session = await auth();
  return (
    <html lang="id" translate="no" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session} refetchOnWindowFocus>
          <Providers>
            {props.children}
            <Toaster />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
