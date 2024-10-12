"use client";

import { columnHelper } from "@/lib/column-helper";
import { formatDate } from "@/lib/utils";
import { D, pipe } from "@mobily/ts-belt";
import { DoctorListColumnAction } from "./doctor-list-column-action";
import { getSpecialistLabel } from "@/lib/specialist";
import { For } from "@/components/ui/for";
import { getDatesValue } from "@/lib/available-dates";
import { Badge } from "@/components/ui/badge";
import { match } from "ts-pattern";

export const getDoctorListColumn = (role: Role) => {
  let ch = columnHelper<Doctor>();

  return match(role)
    .with("admin", () => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Nama")("name"),
      ch.renderColumn("Spesialisasi")("specialist", (data) =>
        getSpecialistLabel(data.specialist)
      ),
      ch.renderColumn("Tersedia pada hari")("availableDates", (data) => {
        let dates = data.availableDates;
        return (
          <div className="inline-flex items-center gap-x-1">
            <For each={dates}>
              {(date) => (
                <Badge className="Badgex-1.5">{getDatesValue(date)}</Badge>
              )}
            </For>
          </div>
        );
      }),
      ch.renderColumn("Dibuat pada")("createdAt", (data) => {
        return pipe(data, D.getUnsafe("createdAt"), formatDate);
      }),
      ch.renderAction((props) => <DoctorListColumnAction {...props} />),
    ])
    .otherwise(() => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Nama")("name"),
      ch.renderColumn("Spesialisasi")("specialist", (data) =>
        getSpecialistLabel(data.specialist)
      ),
      ch.renderColumn("Tersedia pada hari")("availableDates", (data) => {
        let dates = data.availableDates;
        return (
          <div className="inline-flex items-center gap-x-1">
            <For each={dates}>
              {(date) => (
                <Badge className="Badgex-1.5">{getDatesValue(date)}</Badge>
              )}
            </For>
          </div>
        );
      }),
    ]);
};
