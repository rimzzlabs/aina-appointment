import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MenuItem } from "@/lib/sidebar-menu";
import clsx from "clsx";
import Link from "next/link";

export function SidebarNavItem({
  path,
  active,
  label,
  visible,
  icon: Icon,
}: MenuItem) {
  if (!visible) return null;

  return (
    <Tooltip delayDuration={250}>
      <TooltipTrigger asChild>
        <Link
          href={path}
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
            active && "bg-accent text-black"
          )}
        >
          <Icon className="size-5" />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
