import { Heading } from "@/components/ui/heading";
import { Fragment } from "react";
import { DoctorList, DoctorListAddButton } from "@/features/doctor/list";
import { getDoctors } from "@/database/query/doctor";
import { F, O, pipe } from "@mobily/ts-belt";

export default async function DoctorListPage(props: PageProps) {
  let search = pipe(
    O.fromNullable(props.searchParams?.q),
    O.mapWithDefault("", F.identity)
  );
  let doctors = await getDoctors(search);

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
