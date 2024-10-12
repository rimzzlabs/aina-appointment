import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { For } from "../ui/for";

type TModalViewItem = Readonly<[string, any]>;
type TModalView<D extends TModalViewItem> = {
  items: Array<D>;
  title: string;
  description: string;
};

export function ModalView<D extends TModalViewItem>(props: TModalView<D>) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{props.title}</AlertDialogTitle>
        <AlertDialogDescription>{props.description}</AlertDialogDescription>
      </AlertDialogHeader>

      <div className="space-y-4">
        <For each={props.items}>
          {([label, value]) => (
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                {label}
              </p>
              <div className="bg-accent font-medium py-1.5 px-4 text-accent-foreground rounded-lg">
                {value}
              </div>
            </div>
          )}
        </For>
      </div>

      <AlertDialogFooter className="justify-end">
        <AlertDialogCancel>Tutup</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
