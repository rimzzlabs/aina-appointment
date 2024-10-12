import { pushModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function AppointmentListColumnViewUser(props: Appointment) {
  let user = props.user;

  if (!user)
    return (
      <Button disabled variant="outline">
        <EyeIcon size="1rem" />
        Lihat
      </Button>
    );

  if (user.deleted) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="p-0 h-9 w-9">
            <EyeOffIcon size="1rem" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p className="text-sm text-muted-foreground">
            Pengguna ini telah di hapus
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  let onClickViewUser = (data: NonNullable<Appointment["user"]>) => {
    return () => {
      pushModal("ModalView", {
        title: "Detail User",
        description:
          "Berikut adalah detail data user yang membuat pertemuan ini",
        items: [
          ["Nama Lengkap User", data.name],
          ["Email User", data.email],
          ["Bergabung pada", formatDate(data.createdAt, "d MMMM yyyy")],
        ],
      });
    };
  };

  return (
    <Button
      variant="outline"
      onClick={onClickViewUser(user)}
      className="gap-x-2"
    >
      <EyeIcon size="1rem" />
      {user.name}
    </Button>
  );
}
