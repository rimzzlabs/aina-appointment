"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";

import { ModalFormFooter } from "@/components/modals/modal-form";
import { updateServiceSchema } from "../__schema";
import { Textarea } from "@/components/ui/textarea";
import { updateServiceAction } from "../__action";
import { popModal } from "@/components/modals";

export function ServiceListUpdateForm(
  props: Pick<Service, "id" | "name" | "description">
) {
  let form = useForm<z.infer<typeof updateServiceSchema>>({
    defaultValues: props,
    resolver: zodResolver(updateServiceSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await updateServiceAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    popModal("ModalForm");
    toast.success("Berhasil memperbarui data layanan");
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
                <FormLabel>Nama layanan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="FACIAL TERAPI ACNE/JERAWAT"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Layanan</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Mengatasi acne yang meradang hebat, kulit berminyak yang tidak bisa dilakukan facial biasa"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ModalFormFooter
          disabled={form.formState.isSubmitting}
          label="Update Layanan"
        />
      </form>
    </Form>
  );
}
