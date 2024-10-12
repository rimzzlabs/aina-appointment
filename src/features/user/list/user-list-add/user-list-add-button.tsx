"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserListAddForm } from "./user-list-add-form";
import { useState } from "react";

export function UserListAddButton() {
  let [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="gap-x-2">Buat User</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tambah User</AlertDialogTitle>
          <AlertDialogDescription>
            Buat user baru dari akun administrator
          </AlertDialogDescription>
        </AlertDialogHeader>

        <UserListAddForm onClose={() => setOpen(false)} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
