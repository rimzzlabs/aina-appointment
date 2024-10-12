"use client";

import { Fragment } from "react";
import { SearchInput } from "./search-input";
import { UserDropdown } from "./user-dropdown";
import { B } from "@mobily/ts-belt";
import { usePathname } from "next/navigation";

type TProps = {
  withSearchbar?: boolean;
  children: React.ReactNode;
};

export function PrivateLayoutContainer({
  children,
  withSearchbar = false,
}: TProps) {
  let pathname = usePathname();

  let showSearch = !pathname.includes("/appointment");

  return (
    <Fragment>
      <header className="sticky top-0 z-30 justify-end flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 md:bg-transparent sm:px-6">
        {B.ifElse(
          withSearchbar,
          () =>
            B.ifElse(
              showSearch,
              () => <SearchInput />,
              () => null
            ),
          () => null
        )}
        <UserDropdown />
      </header>
      <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
        {children}
      </main>
    </Fragment>
  );
}
