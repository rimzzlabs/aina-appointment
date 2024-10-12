"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { viewDoctorAtom } from "../states/doctor-data-table";
import { useAtom } from "jotai";
import { formatDate } from "@/lib/utils";
import { isValidObject } from "@/lib/if-else";
import { getSpecialistLabel } from "@/lib/specialist";

export function DoctorListColumnView() {
  let [viewDoctor, setViewDoctor] = useAtom(viewDoctorAtom);

  let onOpenChange = (open: boolean) => {
    setViewDoctor((prev) => ({ ...prev, open }));
  };

  let doctor = viewDoctor.doctor;

  return (
    <AlertDialog open={viewDoctor.open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detail Dokter</AlertDialogTitle>
          <AlertDialogDescription>
            Berikut adalah detail dokter
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isValidObject(doctor, (doctor) => (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">ID</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {doctor.id}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">Nama</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {doctor.name}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Spesialisasi
              </p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {getSpecialistLabel(doctor.specialist)}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Dibuat Pada
              </p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {formatDate(doctor.createdAt)} WIB
              </div>
            </div>
          </div>
        ))}

        <AlertDialogFooter className="justify-end">
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
