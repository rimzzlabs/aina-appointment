"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAppointmentSchema } from "../../__schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { For } from "@/components/ui/for";
import { ModalFormFooter } from "@/components/modals/modal-form";
import { AppointmentListAddFormDate } from "./appointment-list-add-form-date";
import { APPOINTMENT_SEX, APPOINTMENT_SKIN_TYPES } from "@/lib/appointment";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { AppointmentListAddFormDoctor } from "./appointment-list-add-form-doctor";
import { createAppointmentAction } from "../../__action";

type TProps = { onClose: () => void; doctors: Array<Doctor>; userId: string };

export function AppointmentListAddForm(props: TProps) {
  let form = useForm<z.infer<typeof createAppointmentSchema>>({
    defaultValues: {
      userId: props.userId,
      age: "" as unknown as number,
    },
    resolver: zodResolver(createAppointmentSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await createAppointmentAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    props.onClose();
    toast.success("Berhasil membuat jadwal janji temu");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-6">
        <ScrollArea className="h-[66svh]">
          <div className="space-y-3 p-1">
            <AppointmentListAddFormDate />

            <AppointmentListAddFormDoctor doctors={props.doctors} />

            <FormField
              name="age"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Masukan umur</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      min={0}
                      type="number"
                      placeholder="17 Tahun"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sex"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>

                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger disabled={form.formState.isSubmitting}>
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <For each={APPOINTMENT_SEX}>
                        {(sex) => (
                          <SelectItem value={sex.value}>{sex.label}</SelectItem>
                        )}
                      </For>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="skinType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kulit</FormLabel>

                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger disabled={form.formState.isSubmitting}>
                        <SelectValue placeholder="Pilih Jenis Kulit" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <For each={APPOINTMENT_SKIN_TYPES}>
                        {(skin) => (
                          <SelectItem value={skin.value}>
                            {skin.label}
                          </SelectItem>
                        )}
                      </For>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="remark"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan (opsional)</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Catatan (maksimal 255 karakter)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        <ModalFormFooter
          disabled={form.formState.isSubmitting}
          label="Buat Pertemuan"
        />
      </form>
    </Form>
  );
}
