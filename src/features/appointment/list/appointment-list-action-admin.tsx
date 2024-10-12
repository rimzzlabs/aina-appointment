"use client";

import { popModal, pushModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { BanIcon, CheckSquareIcon, ChevronsUpDownIcon } from "lucide-react";
import { toast } from "sonner";

import { B } from "@mobily/ts-belt";
import { z } from "zod";
import { cancelAppointmentSchema } from "../__schema";
import { updateStatusAppointmentAction } from "../__action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppointmentListColumnActionAdmin(props: Appointment) {
  let isPending = props.status === "pending";

  let onClickReject = (data: z.infer<typeof cancelAppointmentSchema>) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Tolak permintaan ini?",
        description: "Apa anda yakin ingin menolak permintaan pertemuan ini?",
        labelAction: "Tolak",
        labelCancel: "Kembali",
        onAction: async () => {
          toast.loading("Memproses...");
          let res = await updateStatusAppointmentAction({
            ...data,
            status: "rejected",
          });
          toast.dismiss();

          if (res?.error) {
            return toast.error(res.error);
          }

          popModal("ModalConfirmation");
          toast.success("Berhasil menolak pertemuan!");
        },
      });
    };
  };

  let onClickSuccess = (data: z.infer<typeof cancelAppointmentSchema>) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Selesaikan pertemuan ini?",
        description: "Apa anda yakin ingin menyelesaikan pertemuan ini?",
        labelAction: "Selesaikan",
        labelCancel: "Kembali",
        onAction: async () => {
          toast.loading("Memproses...");
          let res = await updateStatusAppointmentAction({
            ...data,
            status: "success",
          });
          toast.dismiss();

          if (res?.error) {
            return toast.error(res.error);
          }

          popModal("ModalConfirmation");
          toast.success("Berhasil memperbarui status pertemuan!");
        },
      });
    };
  };

  if (!props.userId || B.inverse(isPending)) {
    return <span>-</span>;
  }

  let isHideMenu = ["cancelled", "expired", "rejected", "success"].includes(
    props.status
  );

  if (isHideMenu) return <span>-</span>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-x-2">
          Menu <ChevronsUpDownIcon size="1em" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={onClickSuccess({
            userId: props.userId,
            appointmentId: props.id,
          })}
          className="gap-x-2"
        >
          <CheckSquareIcon size="1em" />
          Selesaikan
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onClickReject({
            userId: props.userId,
            appointmentId: props.id,
          })}
          className="gap-x-2"
        >
          <BanIcon size="1em" />
          Tolak
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
