"use client";

import { Fragment } from "react";
import { getDoctorListColumn } from "./doctor-list-column";
import { DataTable } from "@/features/shared";
import { DoctorListColumnView } from "./docto-list-column-view";
import { useSession } from "next-auth/react";

export async function DoctorList(props: { doctors: Array<Doctor> }) {
  let session = useSession({ required: true });

  if (!session.data?.user) return <p>Loading...</p>;

  return (
    <Fragment>
      <DataTable
        columns={getDoctorListColumn(session.data.user.role)}
        data={props.doctors}
      />

      <DoctorListColumnView />
    </Fragment>
  );
}
