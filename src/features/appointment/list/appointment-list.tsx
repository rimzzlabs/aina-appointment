"use client";

import { DataTable } from "@/features/shared";
import { Fragment } from "react";
import { getAppointmentListColumn } from "./appoinment-list-column";
import { useSession } from "next-auth/react";

export function AppointmentList(props: { appointments: Array<Appointment> }) {
  let session = useSession({ required: true });

  if (!session.data?.user) return <p>Loading...</p>;

  return (
    <Fragment>
      <DataTable
        data={props.appointments}
        columns={getAppointmentListColumn(session.data.user.role)}
      />
    </Fragment>
  );
}
