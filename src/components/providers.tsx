"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "./ui/tooltip";
import { ModalProvider } from "./modals";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      enableColorScheme
      storageKey="app.aina.theme"
      {...props}
    >
      <TooltipProvider>{children}</TooltipProvider>
      <ModalProvider />
    </NextThemesProvider>
  );
}
