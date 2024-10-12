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
import { viewUserAtom } from "../states/user-data-table";
import { useAtom } from "jotai";
import { formatDate } from "@/lib/utils";

export function UserListColumnView() {
  let [viewUser, setViewUser] = useAtom(viewUserAtom);

  let onOpenChange = (open: boolean) => {
    setViewUser((prev) => ({ ...prev, open }));
  };

  let user = viewUser.user;

  return (
    <AlertDialog open={viewUser.open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detail User</AlertDialogTitle>
          <AlertDialogDescription>
            Berikut adalah detail user
          </AlertDialogDescription>
        </AlertDialogHeader>

        {user ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">ID</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {user.id}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">Nama</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {user.name}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">Email</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {user.email}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">Role</p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {user.role}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Bergabung Pada
              </p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {formatDate(user.createdAt)} WIB
              </div>
            </div>
          </div>
        ) : null}

        <AlertDialogFooter className="justify-end">
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
