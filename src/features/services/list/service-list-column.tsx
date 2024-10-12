"use client";

import { columnHelper } from "@/lib/column-helper";
import { ServiceListColumnAction } from "./service-list-column-action";
import { formatDate } from "@/lib/utils";
import { D, pipe } from "@mobily/ts-belt";
import { match } from "ts-pattern";

let ch = columnHelper<Service>();

export const getServiceListColumn = (role: Role) => {
  return match(role)
    .with("admin", () => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Layanan")("name"),
      ch.renderSimpleColumn("Deksripsi")("description"),
      ch.renderColumn("Dibuat pada")("createdAt", (data) => {
        return pipe(data, D.getUnsafe("createdAt"), formatDate);
      }),
      ch.renderAction((props) => <ServiceListColumnAction {...props} />),
    ])
    .otherwise(() => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Layanan")("name"),
      ch.renderSimpleColumn("Deksripsi")("description"),
      ch.renderColumn("Terakhir diperbarui")("updatedAt", (data) => {
        return pipe(data, D.getUnsafe("updatedAt"), formatDate);
      }),
    ]);
};
