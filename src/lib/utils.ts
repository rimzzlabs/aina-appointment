import { B, pipe } from "@mobily/ts-belt";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleName(role: Role) {
  return B.ifElse(
    role === "admin",
    () => "Admin",
    () => "Customer"
  );
}

/**
 *
 * @param date should be valid date
 * @param token the unicode token that `date-fns` can parse
 * @default token "d MMMM, yyyy"
 * @returns
 */
export function formatDate(
  date: string | number | Date,
  token = "d MMMM, yyyy. H:mm"
) {
  const zonedTime = toZonedTime(date, "Asia/Jakarta");
  return format(zonedTime, token, { locale: id });
}

export function formatDateToMySqlString(date: Date, timeZone = "Asia/Jakarta") {
  // Convert to the desired timezone
  const zonedDate = toZonedTime(date, timeZone);

  // Format to MySQL compatible string
  return format(zonedDate, "yyyy-MM-dd HH:mm:ss");
}

export function onUpdateSchemaFn() {
  let d = new Date();
  return pipe(d, formatDateToMySqlString);
}
