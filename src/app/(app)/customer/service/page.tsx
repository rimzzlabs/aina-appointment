import { Heading } from "@/components/ui/heading";
import { getServices } from "@/database/query/service";
import { ServiceList } from "@/features/services/list";
import { Fragment } from "react";

export default async function CustomerServicePage() {
  let services = await getServices();

  return (
    <Fragment>
      <Heading>Eksplor Layanan di Aina Beauty</Heading>

      <ServiceList services={services} />
    </Fragment>
  );
}
