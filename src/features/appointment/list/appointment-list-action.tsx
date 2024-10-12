"use client";

import { popModal, pushModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";
import { toast } from "sonner";

import { B } from "@mobily/ts-belt";
import { z } from "zod";
import { cancelAppointmentSchema } from "../__schema";
import { cancelAppointmentAction } from "../__action";

export function AppointmentListColumnAction(props: Appointment) {
  let isPending = props.status === "pending";

  let onClickDelete = (data: z.infer<typeof cancelAppointmentSchema>) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Batalkan Pertemuan Ini?",
        description: "Apa anda yakin ingin membatalkan pertemuan ini?",
        labelAction: "Batalkan",
        labelCancel: "Kembali",
        onAction: async () => {
          toast.loading("Memproses...");
          let res = await cancelAppointmentAction(data);
          toast.dismiss();

          if (res?.error) {
            return toast.error(res.error);
          }

          popModal("ModalConfirmation");
          toast.success("Berhasil membatalkan pertemuan!");
        },
      });
    };
  };

  if (!props.userId || B.inverse(isPending)) {
    return <span>-</span>;
  }

  return (
    <Button
      variant="outline"
      onClick={onClickDelete({
        userId: props.userId,
        appointmentId: props.id,
      })}
      className="gap-x-2"
    >
      <BanIcon size="1em" />
      Batalkan
    </Button>
  );
}
