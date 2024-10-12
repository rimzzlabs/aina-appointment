"use client";

import { For } from "@/components/ui/for";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { B, N, pipe } from "@mobily/ts-belt";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { InboxIcon } from "lucide-react";

type TDataTable<D> = {
  data: Array<D>;
  columns: Array<ColumnDef<D, any>>;
  className?: string;
  emptyDescription?: string;
};

export function DataTable<D>(props: TDataTable<D>) {
  let { columns, data } = props;
  let table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  let headerGroups = table?.getHeaderGroups?.() ?? [];
  let rows = table?.getSortedRowModel?.()?.rows ?? [];

  return (
    <ScrollArea className={cn("h-[calc(100svh-10rem)]", props.className)}>
      <Table>
        <TableHeader>
          <For each={headerGroups}>
            {(headerGroup) => (
              <TableRow className="border-t bg-muted">
                <For each={headerGroup.headers}>
                  {(header) => (
                    <TableHead className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>

        <TableBody>
          {B.ifElse(
            pipe(rows.length, N.lt(1)),
            () => (
              <TableRow>
                <TableCell colSpan={table.getLeafHeaders().length}>
                  <div className="flex h-[calc(100vh-16rem)] flex-col items-center justify-center gap-2 tracking-tight">
                    <InboxIcon size="2rem" className="text-muted-foreground" />
                    <p className="text-sm font-semibold text-muted-foreground">
                      {props.emptyDescription ?? "Belum ada data"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ),
            () => null
          )}

          {B.ifElse(
            pipe(rows.length, N.gt(0)),
            () => (
              <For each={rows}>
                {(row) => (
                  <TableRow>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            ),
            () => null
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
