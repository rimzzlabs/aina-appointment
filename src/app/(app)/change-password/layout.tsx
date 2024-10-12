import { PrivateLayoutContainer } from "@/features/layouts";
import { PropsWithChildren } from "react";

export default function ChangePasswordLayout(props: PropsWithChildren) {
  return <PrivateLayoutContainer>{props.children}</PrivateLayoutContainer>;
}
