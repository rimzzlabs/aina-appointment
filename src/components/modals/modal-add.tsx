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
import { isFunction } from "@tanstack/react-table";
import { useState } from "react";

type TModalAdd = {
  cta: string;
  title: string;
  description: string;
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
};
export function ModalAdd(props: TModalAdd) {
  let [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="gap-x-2">{props.cta}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>

        
        {isFunction(props.children)
          ? props.children(() => setOpen(false))
          : props.children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
