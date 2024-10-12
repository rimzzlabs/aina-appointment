"use client";

import { columnHelper } from "@/lib/column-helper";
import { formatDate } from "@/lib/utils";
import { AppointmentListColumnAction } from "./appointment-list-action";
import { getAppointmentStatus } from "@/lib/appointment";
import { Badge } from "@/components/ui/badge";
import { match } from "ts-pattern";
import { getSpecialistLabel } from "@/lib/specialist";
import { isValidObject } from "@/lib/if-else";
import { AppointmentListColumnActionAdmin } from "./appointment-list-action-admin";
import { AppointmentListColumnViewUser } from "./appointment-list-column-view-user";

let ch = columnHelper<Appointment>();

export const getAppointmentListColumn = (role: Role) => {
  return match(role)
    .with("customer", () => [
      ch.renderNumericColumn(),
      ch.renderColumn("Tanggal Pertemuan")(
        "appointmentDate",
        (data) => formatDate(data.appointmentDate) + " WIB"
      ),
      ch.renderSimpleColumn("Dokter")("doctor.name"),
      ch.renderColumn("Dokter Spesialisasi")("doctor.specialist", (data) =>
        isValidObject(data.doctor, (doctor) => {
          return <span>{getSpecialistLabel(doctor.specialist)}</span>;
        })
      ),
      ch.renderColumn("Status")("status", (appo) => {
        let color = match(appo.status)
          .with("pending", () => "bg-amber-600 hover:bg-amber-700")
          .with("cancelled", () => "bg-zinc-600 hover:bg-zinc-700")
          .with("rejected", () => "bg-red-600 hover:bg-red-700")
          .with("expired", () => "bg-violet-600 hover:bg-violet-700")
          .otherwise(() => "bg-emerald-600 hover:bg-emerald-700");

        return (
          <Badge className={color}>{getAppointmentStatus(appo.status)}</Badge>
        );
      }),
      ch.renderColumn("Catatan")("remark", (appo) => (
        <div className="whitespace-pre-wrap">{appo.remark}</div>
      )),

      ch.renderAction((props) => <AppointmentListColumnAction {...props} />),
    ])
    .otherwise(() => [
      ch.renderNumericColumn(),
      ch.renderColumn("Tanggal Pertemuan")(
        "appointmentDate",
        (data) => formatDate(data.appointmentDate) + " WIB"
      ),
      ch.renderSimpleColumn("Dokter")("doctor.name"),
      ch.renderColumn("Dokter Spesialisasi")("doctor.specialist", (data) =>
        isValidObject(data.doctor, (doctor) => {
          return <span>{getSpecialistLabel(doctor.specialist)}</span>;
        })
      ),
      ch.renderColumn("Status")("status", (appo) => {
        let color = match(appo.status)
          .with("pending", () => "bg-amber-600 hover:bg-amber-700")
          .with("cancelled", () => "bg-zinc-600 hover:bg-zinc-700")
          .with("rejected", () => "bg-red-600 hover:bg-red-700")
          .with("expired", () => "bg-violet-600 hover:bg-violet-700")
          .otherwise(() => "bg-emerald-600 hover:bg-emerald-700");

        return (
          <Badge className={color}>{getAppointmentStatus(appo.status)}</Badge>
        );
      }),
      ch.renderColumn("Catatan")("remark", (appo) => (
        <div className="whitespace-pre-wrap">{appo.remark}</div>
      )),
      ch.renderColumn("Dibuat pada")(
        "createdAt",
        (data) => formatDate(data.createdAt) + " WIB"
      ),
      ch.renderColumn("User")("user", (props) => (
        <AppointmentListColumnViewUser {...props} />
      )),
      ch.renderAction((props) => (
        <AppointmentListColumnActionAdmin {...props} />
      )),
    ]);
};
