import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { createAppointmentSchema } from "../../__schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { For } from "@/components/ui/for";
import { A, B, F, O, pipe } from "@mobily/ts-belt";
import { getDatesValue, getDayNumber } from "@/lib/available-dates";
import { Badge } from "@/components/ui/badge";

export function AppointmentListAddFormDoctor(props: {
  doctors: Array<Doctor>;
}) {
  let form = useFormContext<z.infer<typeof createAppointmentSchema>>();

  let appointmentDate = useWatch({
    control: form.control,
    name: "appointmentDate",
  });

  let doctors = pipe(
    O.fromNullable(props?.doctors),
    O.mapWithDefault([], F.identity),
    A.map((doctor) => {
      const appointmentDayNumber = appointmentDate
        ? getDayNumber(appointmentDate)
        : null;

      // Check if the doctor is available on the selected appointment date
      const isAvailable =
        appointmentDayNumber !== null &&
        doctor.availableDates.includes(appointmentDayNumber);
      const disabled = !isAvailable;

      return { ...doctor, disabled };
    })
  );

  return (
    <FormField
      name="doctorId"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pilih Dokter</FormLabel>

          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue placeholder="Pilih dokter" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <For each={doctors}>
                {(doctor) => (
                  <SelectItem disabled={doctor.disabled} value={doctor.id}>
                    {doctor.name}

                    <Badge className="mx-2">
                      {pipe(
                        doctor.availableDates,
                        A.map(getDatesValue),
                        A.join(", ")
                      )}
                    </Badge>

                    {B.ifElse(
                      doctor.disabled,
                      () => (
                        <span>(tidak tesedia)</span>
                      ),
                      () => null
                    )}
                  </SelectItem>
                )}
              </For>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
