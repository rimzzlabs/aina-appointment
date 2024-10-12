import type { PropsWithChildren } from "react";
import { SidebarNav } from "./sidebar";

export async function PrivateLayout(props: PropsWithChildren) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {props.children}
      </div>
    </main>
  );
}
