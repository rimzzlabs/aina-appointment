import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type TModalForm = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function ModalForm(props: TModalForm) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{props.title}</AlertDialogTitle>
        <AlertDialogDescription>{props.description}</AlertDialogDescription>
      </AlertDialogHeader>

      {props.children}
    </AlertDialogContent>
  );
}

export function ModalFormFooter({
  label = "Update",
  disabled,
}: {
  disabled: boolean;
  label: string;
}) {
  return (
    <AlertDialogFooter>
      <AlertDialogCancel disabled={disabled}>Batal</AlertDialogCancel>
      <Button type="submit" disabled={disabled}>
        {label}
      </Button>
    </AlertDialogFooter>
  );
}
