"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createAvatar } from "@dicebear/core";
import { avataaarsNeutral } from "@dicebear/collection";
import { LockIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { popModal, pushModal } from "@/components/modals";
import { signOutAction } from "@/lib/auth/actions";

export function UserDropdown() {
  let user = useSession({ required: true });

  let avatar = createAvatar(avataaarsNeutral, {
    seed: user.data?.user?.email ?? "Handa",
    size: 32,
  }).toDataUri();

  let onClickLogout = () => {
    pushModal("ModalConfirmation", {
      title: "Konfirmasi Logout",
      description: "Apakah anda yakin ingin logout?",
      onAction: async () => {
        await signOutAction();
        popModal("ModalConfirmation");
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={avatar}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>

        <DropdownMenuItem asChild className="gap-x-2">
          <Link href="/change-password">
            <LockIcon size="1em" />
            Ubah Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClickLogout} className="gap-x-2">
          <LogOutIcon size="1em" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
