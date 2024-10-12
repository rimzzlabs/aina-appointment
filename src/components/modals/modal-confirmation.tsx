"use client";

import { Button } from "../ui/button";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { D, F, pipe } from "@mobily/ts-belt";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

type TModalConfirmation = {
  title: string;
  description: string;
  labelAction?: string;
  labelCancel?: string;
  onAction: (() => Promise<void>) | (() => void);
};

export function ModalConfirmation(props: TModalConfirmation) {
  let [isPending, setIsPending] = useState(false);

  let title = pipe(props, D.get("title"), F.defaultTo("Judul komponen modal"));
  let description = pipe(
    props,
    D.get("description"),
    F.defaultTo("Deksripsi komponen modal")
  );
  let labelAction = pipe(
    props,
    D.get("labelAction"),
    F.defaultTo("Konfirmasi")
  );
  let onAction = pipe(props, D.get("onAction"), F.defaultTo(Promise.resolve));

  let handleClick = async () => {
    setIsPending(true);
    await onAction();
  };

  let preventCloseEvent = (e: Event | KeyboardEvent) => {
    if (isPending) e.preventDefault();
  };

  return (
    <AlertDialogContent
      onCloseAutoFocus={preventCloseEvent}
      onEscapeKeyDown={preventCloseEvent}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel disabled={isPending} asChild>
          <Button variant="outline">{props?.labelCancel ?? "Batalkan"}</Button>
        </AlertDialogCancel>
        <Button className="gap-x-2" onClick={handleClick} disabled={isPending}>
          {F.ifElse(
            isPending,
            F.identity,
            F.always(<Loader2Icon size="1em" className="animate-spin" />),
            F.always(null)
          )}

          {labelAction}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
