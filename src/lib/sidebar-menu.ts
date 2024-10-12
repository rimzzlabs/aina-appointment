import { F, pipe, S } from "@mobily/ts-belt";

import {
  CalendarClockIcon,
  SwatchBookIcon,
  StethoscopeIcon,
  Users2Icon,
  type LucideIcon,
} from "lucide-react";

export type MenuItem = {
  visible: boolean;
  path: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  newTab?: boolean;
};

export function getSidebarMenu(pathname: string, role?: Role): Array<MenuItem> {
  if (!role) return [];

  return [
    {
      icon: CalendarClockIcon,
      label: "Daftar Pertemuan",
      path: "/appointment/list",
      visible: pipe(role, F.equals("admin")),
      active: pipe(pathname, S.endsWith("/appointment/list")),
    },
    {
      icon: StethoscopeIcon,
      label: "Daftar Dokter",
      path: "/doctor/list",
      visible: pipe(role, F.equals("admin")),
      active: pipe(pathname, S.endsWith("/doctor/list")),
    },
    {
      icon: SwatchBookIcon,
      label: "Daftar Layanan",
      path: "/service/list",
      visible: pipe(role, F.equals("admin")),
      active: pipe(pathname, S.endsWith("/service/list")),
    },
    {
      icon: Users2Icon,
      label: "Daftar User",
      path: "/user/list",
      visible: pipe(role, F.equals("admin")),
      active: pipe(pathname, S.endsWith("/user/list")),
    },

    {
      icon: CalendarClockIcon,
      label: "Janji Temu",
      path: "/customer/appointment",
      visible: pipe(role, F.equals("customer")),
      active: pipe(pathname, S.endsWith("/customer/appointment")),
    },
    {
      icon: SwatchBookIcon,
      label: "Eksplor Layanan",
      path: "/customer/service",
      visible: pipe(role, F.equals("customer")),
      active: pipe(pathname, S.endsWith("/customer/service")),
    },
    {
      icon: StethoscopeIcon,
      label: "Jadwal Dokter",
      path: "/customer/doctor",
      visible: pipe(role, F.equals("customer")),
      active: pipe(pathname, S.endsWith("/customer/doctor")),
    },
  ];
}
