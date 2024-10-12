"use client";

import { ProductListAddForm } from "./product-list-add-form";
import { ModalAdd } from "@/components/modals/modal-add";

export function ProductListAddButton() {
  return (
    <ModalAdd
      cta="Tambah Produk"
      title="Tambah produk baru"
      description="Tambah data produk baru"
    >
      {(onClose) => <ProductListAddForm onClose={onClose} />}
    </ModalAdd>
  );
}
