import { Heading } from "@/components/ui/heading";
import { getAppointments } from "@/database/query/appointment";
import { AppointmentList } from "@/features/appointment/list/appointment-list";
import { Fragment } from "react";

export default async function ScheduleListPage(props: PageProps) {
  let appointments = await getAppointments(props.searchParams?.q);

  return (
    <Fragment>
      <Heading>Daftar Pertemuan</Heading>

      <AppointmentList appointments={appointments} />
    </Fragment>
  );
}
