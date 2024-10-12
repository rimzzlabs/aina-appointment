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
import { toast } from "sonner";
import { deleteProductAction } from "../__action";
import { ProductListUpdateForm } from "./product-list-update-form";

export function ProductListColumnAction(props: Product) {
  let onClickUpdateProduct = (data: Product) => {
    return () => {
      pushModal("ModalForm", {
        title: "Update",
        description: "Perbarui data produk",
        children: <ProductListUpdateForm {...data} key={data.id} />,
      });
    };
  };

  let onClickDelete = (id: string) => {
    return () => {
      pushModal("ModalConfirmation", {
        title: "Hapus produk ini?",
        description: "Apa anda yakin ingin menghapus produk ini?",
        labelAction: "Hapus",
        onAction: async () => {
          let res = await deleteProductAction(id);

          popModal("ModalConfirmation");
          if (res?.error) {
            return toast.error(res.error);
          }

          toast.success("Berhasil menghapus data produk!");
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
          onClick={onClickUpdateProduct(props)}
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
