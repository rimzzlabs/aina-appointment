"use client";

import { ModalAdd } from "@/components/modals/modal-add";
import { AppointmentListAddForm } from "./appointment-list-add-form";
import { useSession } from "next-auth/react";
import { B, F, N, O, pipe, S } from "@mobily/ts-belt";

export function AppointmentListAddButton(props: { doctors: Array<Doctor> }) {
  let session = useSession({ required: true });

  let userId = pipe(
    O.fromNullable(session?.data?.user?.id),
    O.mapWithDefault("", F.identity)
  );

  return (
    <ModalAdd
      cta="Buat Pertemuan"
      title="Buat pertemuan baru"
      description="Buat pertemuan baru untuk nanti"
    >
      {(onClose) =>
        pipe(
          userId,
          S.length,
          N.gt(0),
          B.ifElse(
            () => (
              <AppointmentListAddForm
                userId={userId}
                key={userId}
                doctors={props.doctors}
                onClose={onClose}
              />
            ),
            () => null
          )
        )
      }
    </ModalAdd>
  );
}
