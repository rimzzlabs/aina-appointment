import { SessionCheck } from "@/components/ui/session-check";
import { PrivateLayout } from "@/features/layouts";
import { Fragment, type PropsWithChildren } from "react";

export default function DashboardLayout(props: PropsWithChildren) {
  return (
    <Fragment>
      <SessionCheck />

      <PrivateLayout>{props.children}</PrivateLayout>
    </Fragment>
  );
}
