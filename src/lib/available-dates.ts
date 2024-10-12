import { addDays, getDay, startOfWeek } from "date-fns";
import { formatDate } from "./utils";

export const AVAILABLE_DATES = [
  { label: "Senin", value: 1 },
  { label: "Selasa", value: 2 },
  { label: "Rabu", value: 3 },
  { label: "Kamis", value: 4 },
  { label: "Jumat", value: 5 },
];

export function getDatesValue(day: number) {
  const today = new Date();
  const startOfTheWeek = startOfWeek(today, { weekStartsOn: 0 }); // 0 for Sunday
  const targetDate = addDays(startOfTheWeek, day);

  return formatDate(targetDate, "EEEE");
}

export function getDayNumber(date: Date) {
  const day = getDay(date); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  return day === 0 ? 7 : day; // Convert Sunday (0) to 7
}
