"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo } from "react";
import { toast } from "sonner";

export function SessionCheck() {
  let session = useSession({ required: true });
  let pathname = usePathname();

  let isDeactivated = useMemo(
    () => session?.data?.user?.deactivated,
    [session?.data?.user?.deactivated]
  );

  useEffect(() => {
    if (isDeactivated) {
      toast.warning("Sesi telah berakhir, silahkan login kembali");
      (async () => await signOut())();
    }
  }, [isDeactivated, pathname]);

  return <Fragment />;
}
