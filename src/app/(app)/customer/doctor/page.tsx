import { Heading } from "@/components/ui/heading";
import { getDoctors } from "@/database/query/doctor";
import { DoctorList } from "@/features/doctor/list";
import { Fragment } from "react";

export default async function CustomerDoctorPage(props: PageProps) {
  let doctors = await getDoctors(props.searchParams?.q);

  return (
    <Fragment>
      <Heading>Jadwal Dokter</Heading>

      <DoctorList doctors={doctors} />
    </Fragment>
  );
}
