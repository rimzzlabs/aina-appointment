"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { createDoctorSchema } from "../../__schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createDoctorAction } from "../../__action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { For } from "@/components/ui/for";
import { DOCTOR_SPECIALIST } from "@/lib/specialist";
import { AVAILABLE_DATES, getDatesValue } from "@/lib/available-dates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { A, F, pipe } from "@mobily/ts-belt";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalFormFooter } from "@/components/modals/modal-form";

export function DoctorListAddForm(props: { onClose: () => void }) {
  let form = useForm<z.infer<typeof createDoctorSchema>>({
    defaultValues: { name: "", availableDates: [] },
    resolver: zodResolver(createDoctorSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await createDoctorAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    props.onClose();
    toast.success("Berhasil membuat data dokter baru");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-6">
        <div className="space-y-3">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap dokter</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Dr. Dre"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="specialist"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spesialis Dokter</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger
                      ref={field.ref}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectValue placeholder="Pilih spesialis dokter" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <For each={DOCTOR_SPECIALIST}>
                        {(specialist) => (
                          <SelectItem value={specialist.value}>
                            {specialist.label}
                          </SelectItem>
                        )}
                      </For>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="availableDates"
            control={form.control}
            render={({ field }) => {
              let value = field.value;
              let label = pipe(
                value,
                F.ifElse(
                  (dates) => dates.length > 0,
                  (dates) => pipe(dates, A.map(getDatesValue), A.join(", ")),
                  () => "Pilih ketersediaan"
                )
              );

              let onClickDate = (day: number) => {
                return () => {
                  let dates = pipe(
                    field.value,
                    F.ifElse(
                      A.some((d) => d === day),
                      A.filter((d) => d !== day),
                      A.concat([day])
                    ),
                    A.sortBy((a) => a),
                    F.toMutable
                  );
                  field.onChange(dates);
                };
              };
              let isSelected = (day: number) => {
                return pipe(
                  field.value,
                  A.some((d) => d === day)
                );
              };

              return (
                <FormItem>
                  <FormLabel>Ketersediaan hari</FormLabel>
                  <DropdownMenu>
                    <FormControl>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-normal"
                        >
                          {label}
                          <ChevronDownIcon size="1rem" className="ml-auto" />
                        </Button>
                      </DropdownMenuTrigger>
                    </FormControl>

                    <DropdownMenuContent side="top" align="end">
                      <For each={AVAILABLE_DATES}>
                        {(date) => (
                          <DropdownMenuItem
                            className="gap-x-2"
                            onClick={onClickDate(date.value)}
                          >
                            <CheckIcon
                              size="1em"
                              className={cn(
                                "stroke-muted-foreground invisible",
                                isSelected(date.value) && "visible"
                              )}
                            />
                            {date.label}
                          </DropdownMenuItem>
                        )}
                      </For>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <ModalFormFooter
          disabled={form.formState.isSubmitting}
          label="Buat Dokter"
        />
      </form>
    </Form>
  );
}
