"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { B, pipe, S } from "@mobily/ts-belt";

export function SearchInput() {
  let router = useRouter();
  let pathname = usePathname();
  let searchParams = useSearchParams();
  let [isPending, startTransition] = useTransition();

  let [search, setSearch] = useState("");

  let spinner = B.ifElse(
    isPending,
    () => (
      <Loader2Icon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground animate-spin" />
    ),
    () => null
  );

  let updateSearchParams = (value = "") => {
    let params = new URLSearchParams(searchParams);
    let synthesizedValue = pipe(value, S.replaceByRe(/\s+/g, ""));

    if (synthesizedValue) {
      params.set("q", synthesizedValue);
    } else {
      params.delete("q");
    }

    let options = { scroll: false };
    let url = `${pathname}?${params.toString()}`;
    startTransition(() => {
      router.replace(url, options);
    });
  };

  useEffect(() => {
    const timoutId = setTimeout(() => updateSearchParams(search), 250);

    return () => clearTimeout(timoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="relative flex-1 md:grow-0">
      <SearchIcon className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      {spinner}
      <Input
        name="q"
        type="search"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
