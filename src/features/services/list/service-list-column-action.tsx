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
import { ChevronsUpDownIcon, TrashIcon, UploadIcon } from "lucide-react";
import { ServiceListUpdateForm } from "./service-list-update-form";
import { deleteServiceAction } from "../__action";
import { toast } from "sonner";

export function ServiceListColumnAction(props: Service) {
  let onClickUpdateService = (data: Service) => {
    return () => {
      pushModal("ModalForm", {
        title: "Update layanan",
        description: "Update nama layanan atau deskripsi",
        children: <ServiceListUpdateForm {...data} key={data.id} />,
      });
    };
  };

  let onClickDelete = (id: string) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Hapus layanan?",
        description: "Apa anda yakin ingin menghapus layanan ini?",
        labelAction: "Hapus",
        onAction: async () => {
          let res = await deleteServiceAction(id);

          popModal("ModalConfirmation");
          if (res?.error) {
            return toast.error(res.error);
          }

          toast.success("Berhasil menghapus layanan!");
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
          onClick={onClickUpdateService(props)}
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
