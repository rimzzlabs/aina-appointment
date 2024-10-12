"use client";

import * as React from "react";

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { createAppointmentSchema } from "../../__schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { id } from "date-fns/locale";
import { isWeekend } from "date-fns";
import { TimePicker } from "@/components/ui/time-picker";

export function AppointmentListAddFormDate() {
  let form = useFormContext<z.infer<typeof createAppointmentSchema>>();

  let disabledDate = (date: Date) => {
    let today = new Date();
    return date <= today || isWeekend(date);
  };

  return (
    <FormField
      control={form.control}
      name="appointmentDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-left">Tanggal Pertemuan</FormLabel>
          <Popover>
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    formatDate(field.value, "PPP HH:mm:ss")
                  ) : (
                    <span>Pilih tanggal pertemuan</span>
                  )}
                </Button>
              </PopoverTrigger>
            </FormControl>

            <PopoverContent align="end" className="w-auto p-0">
              <Calendar
                initialFocus
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDate}
                locale={id}
              />
              <div className="p-3 border-t border-border">
                <TimePicker setValue={field.onChange} value={field.value} />
              </div>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
