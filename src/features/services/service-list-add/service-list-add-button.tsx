"use client";

import { ServiceListAddForm } from "./service-list-add-form";
import { ModalAdd } from "@/components/modals/modal-add";

export function ServiceListAddButton() {
  return (
    <ModalAdd
      cta="Tambah Layanan"
      title="Tambah layanan baru"
      description="Tambah data layanan baru"
    >
      {(onClose) => <ServiceListAddForm onClose={onClose} />}
    </ModalAdd>
  );
}
