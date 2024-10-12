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
import { useSetAtom } from "jotai";
import {
  ChevronsUpDownIcon,
  EyeIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  openUpdateUserAtom,
  openViewUserAtom,
} from "../states/user-data-table";
import { deleteUserAction } from "../__action";

export function UserListColumnAction(props: User) {
  let openViewUser = useSetAtom(openViewUserAtom);
  let openUpdateUser = useSetAtom(openUpdateUserAtom);

  let onClickOpenViewUser = () => openViewUser(props);
  let onClickOpenUpdateUser = () => {
    openUpdateUser({ id: props.id, email: props.email, name: props.name });
  };

  let onClickDelete = (userId: string) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Hapus user ini?",
        description: "Apa anda yakin ingin menghapus pengguna ini?",
        labelAction: "Hapus",
        onAction: async () => {
          let res = await deleteUserAction(userId);

          popModal("ModalConfirmation");
          if (res?.error) {
            return toast.error(res.error);
          }

          toast.success("Berhasil menghapus pengguna!");
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
        <DropdownMenuItem className="gap-x-2" onClick={onClickOpenViewUser}>
          <EyeIcon size="1em" />
          Lihat
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-x-2" onClick={onClickOpenUpdateUser}>
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
