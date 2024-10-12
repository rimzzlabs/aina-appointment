import { PrivateLayoutContainer } from "@/features/layouts";
import { PropsWithChildren } from "react";

export default function DoctorLayout(props: PropsWithChildren) {
  return (
    <PrivateLayoutContainer withSearchbar>
      {props.children}
    </PrivateLayoutContainer>
  );
}
