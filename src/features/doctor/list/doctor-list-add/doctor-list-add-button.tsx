"use client";

import { DoctorListAddForm } from "./doctor-list-add-form";
import { ModalAdd } from "@/components/modals/modal-add";

export function DoctorListAddButton() {
  return (
    <ModalAdd
      cta="Tambah Dokter"
      title="Tambah dokter baru"
      description="Tambah data dokter baru dan jadwal yang ditentukan"
    >
      {(onClose) => <DoctorListAddForm onClose={onClose} />}
    </ModalAdd>
  );
}
