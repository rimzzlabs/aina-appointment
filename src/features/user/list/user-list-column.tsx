"use client";

import { columnHelper } from "@/lib/column-helper";
import { UserListColumnAction } from "./user-list-column-action";
import { formatDate } from "@/lib/utils";
import { A, D, pipe, S } from "@mobily/ts-belt";
import { Badge } from "@/components/ui/badge";

let ch = columnHelper<User & { appointments: Array<Appointment> }>();

export const USER_LIST_COLUMN = [
  ch.renderNumericColumn(),
  ch.renderSimpleColumn("Nama")("name"),
  ch.renderSimpleColumn("Email")("email"),
  ch.renderColumn("Bergabung Pada")("createdAt", (data) => {
    return pipe(data, D.getUnsafe("updatedAt"), formatDate, S.append(" WIB"));
  }),
  ch.renderColumn("Jumlah kunjungan berhasil")("appointments", (data) => {
    let successAppointments = pipe(
      data.appointments,
      A.filter((appo) => appo.status === "success"),
      A.length
    );
    return (
      <Badge className="bg-emerald-600 hover:bg-emerald-600">
        {successAppointments} Kunjungan
      </Badge>
    );
  }),
  ch.renderColumn("Jumlah kunjungan gagal")("appointments", (data) => {
    let rejectedAppointments = pipe(
      data.appointments,
      A.filter((appo) => appo.status === "rejected"),
      A.length
    );
    let canceledAppointments = pipe(
      data.appointments,
      A.filter((appo) => appo.status === "cancelled"),
      A.length
    );
    return (
      <div className="inline-flex flex-col gap-1">
        <Badge className="bg-red-600 hover:bg-red-600">
          {rejectedAppointments} Ditolak
        </Badge>
        <Badge className="bg-zinc-600 hover:bg-zinc-600">
          {canceledAppointments} Dibatalkan
        </Badge>
      </div>
    );
  }),

  ch.renderColumn("Jumlah kunjungan kedaluwarsa")("appointments", (data) => {
    let expiredAppointments = pipe(
      data.appointments,
      A.filter((appo) => appo.status === "expired"),
      A.length
    );
    return (
      <Badge className="bg-violet-600 hover:bg-violet-600">
        {expiredAppointments} Kedaluwarsa
      </Badge>
    );
  }),
  ch.renderColumn("Kumulasi jumlah kunjungan")("appointments", (data) => {
    let appointments = pipe(data.appointments, A.length);
    return <Badge variant="outline">{appointments} Kunjungan</Badge>;
  }),
  ch.renderAction((props) => <UserListColumnAction {...props} />),
];
