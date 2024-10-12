"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAtom } from "jotai";
import { updateUserAtom } from "../../states/user-data-table";
import { UserListColumnUpdateForm } from "./user-list-column-update-form";

export function UserListColumnUpdate() {
  let [updateUser, setUpdateUser] = useAtom(updateUserAtom);

  let user = updateUser.user;

  let onOpenChange = () => setUpdateUser((prev) => ({ ...prev, open: false }));

  return (
    <AlertDialog open={updateUser.open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update</AlertDialogTitle>
          <AlertDialogDescription>
            Update data dan password user
          </AlertDialogDescription>
        </AlertDialogHeader>

        {user !== null ? <UserListColumnUpdateForm {...user} /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
