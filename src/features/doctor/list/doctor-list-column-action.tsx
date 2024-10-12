"use client";

import { popModal, pushModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsUpDownIcon,
  EyeIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";
import { DoctorListUpdateForm } from "./doctor-list-update-form";
import { deleteDoctorAction } from "../__action";
import { getSpecialistLabel } from "@/lib/specialist";
import { formatDate } from "@/lib/utils";

export function DoctorListColumnAction(props: Doctor) {
  let onClickViewDoctor = (data: Doctor) => {
    return () => {
      pushModal("ModalView", {
        title: "Detail Dokter",
        description: "Berikut adalah detail data dokter",
        items: [
          ["Nama Lengkap", data.name],
          ["Spesialisasi", getSpecialistLabel(data.specialist)],
          ["Dibuat pada", formatDate(data.createdAt)],
        ],
      });
    };
  };
  let onClickUpdateDoctor = (data: Doctor) => {
    return () => {
      pushModal("ModalForm", {
        title: "Update",
        description: "Perbarui data dokter",
        children: <DoctorListUpdateForm {...data} key={data.id} />,
      });
    };
  };

  let onClickDelete = (id: string) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Hapus dokter ini?",
        description: "Apa anda yakin ingin menghapus dokter ini?",
        labelAction: "Hapus",
        onAction: async () => {
          let res = await deleteDoctorAction(id);

          popModal("ModalConfirmation");
          if (res?.error) {
            return toast.error(res.error);
          }

          toast.success("Berhasil menghapus data dokter!");
        },
      });
    };
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-x-2">
          Menu <ChevronsUpDownIcon size="1em" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          className="gap-x-2"
          onClick={onClickViewDoctor(props)}
        >
          <EyeIcon size="1em" />
          Lihat
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-x-2"
          onClick={onClickUpdateDoctor(props)}
        >
          <UploadIcon size="1em" />
          Perbarui
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickDelete(props.id)} className="gap-x-2">
          <TrashIcon size="1em" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
