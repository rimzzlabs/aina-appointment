import { Heading } from "@/components/ui/heading";
import { getUserAppointment } from "@/database/query/appointment";
import { getDoctors } from "@/database/query/doctor";
import { AppointmentListAddButton } from "@/features/appointment/list";
import { AppointmentList } from "@/features/appointment/list/appointment-list";
import { auth } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { Fragment } from "react";

export default async function CustomerSchedulePage(props: PageProps) {
  let session = await auth();
  if (!session?.user) redirect("/", RedirectType.replace);

  const [doctors, appointments] = await Promise.all([
    getDoctors(),
    getUserAppointment(session.user.id, props.searchParams?.q),
  ]);

  return (
    <Fragment>
      <nav className="flex items-center justify-between">
        <Heading>Jadwal Pertemuan Saya</Heading>

        <AppointmentListAddButton doctors={doctors} />
      </nav>

      <AppointmentList appointments={appointments} />
    </Fragment>
  );
}
