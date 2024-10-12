"use client";

import { DataTable } from "@/features/shared";
import { Fragment } from "react";
import { getServiceListColumn } from "./service-list-column";
import { useSession } from "next-auth/react";

export function ServiceList(props: { services: Array<Service> }) {
  let session = useSession({ required: true });

  if (!session.data?.user) return <p>Loading...</p>;

  return (
    <Fragment>
      <DataTable
        data={props.services}
        columns={getServiceListColumn(session.data.user.role)}
      />
    </Fragment>
  );
}
