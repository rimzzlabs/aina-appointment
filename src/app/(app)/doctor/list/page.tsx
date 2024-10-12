import { Heading } from "@/components/ui/heading";
import { Fragment } from "react";
import { DoctorList, DoctorListAddButton } from "@/features/doctor/list";
import { getDoctors } from "@/database/query/doctor";

export default async function DoctorListPage() {
  let doctors = await getDoctors();

  return (
    <Fragment>
      <nav className="flex items-center justify-between">
        <Heading>Daftar Dokter</Heading>

        <DoctorListAddButton />
      </nav>

      <DoctorList doctors={doctors} />
    </Fragment>
  );
}
