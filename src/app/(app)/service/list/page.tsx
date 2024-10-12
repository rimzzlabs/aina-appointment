import { Heading } from "@/components/ui/heading";
import { getServices } from "@/database/query/service";
import { ServiceList } from "@/features/services/list";
import { ServiceListAddButton } from "@/features/services/service-list-add";
import { Fragment } from "react";

export default async function ServiceListPage() {
  let services = await getServices();

  return (
    <Fragment>
      <nav className="flex items-center justify-between">
        <Heading>Daftar Layanan</Heading>

        <ServiceListAddButton />
      </nav>

      <ServiceList services={services} />
    </Fragment>
  );
}
