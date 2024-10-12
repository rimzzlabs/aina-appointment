"use client";

import Link from "next/link";
import { SidebarNavItem } from "./sidebar-nav-item";
import { For } from "@/components/ui/for";
import { usePathname } from "next/navigation";
import { getSidebarMenu } from "@/lib/sidebar-menu";
import Image from "next/image";
import { B } from "@mobily/ts-belt";
import { useSession } from "next-auth/react";

export function SidebarNav() {
  let pathname = usePathname();
  let session = useSession({ required: true });

  let role = session?.data?.user?.role;
  let menu = getSidebarMenu(pathname, role);

  let href = B.ifElse(
    role === "admin",
    () => "/appointment/list",
    () => "/customer/appointment"
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href={href}>
          <Image src="/logo.jpeg" alt="Aina Logo" width={24} height={24} />
          <span className="sr-only">Aina Beaty Center</span>
        </Link>

        <For each={menu}>{(args) => <SidebarNavItem {...args} />}</For>
      </nav>
    </aside>
  );
}
