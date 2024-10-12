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
import { createServiceSchema } from "../__schema";
import { Textarea } from "@/components/ui/textarea";
import { createServiceAction } from "../__action";

export function ServiceListAddForm(props: { onClose: () => void }) {
  let form = useForm<z.infer<typeof createServiceSchema>>({
    defaultValues: { name: "", description: "" },
    resolver: zodResolver(createServiceSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await createServiceAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    props.onClose();
    toast.success("Berhasil membuat data layanan baru");
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
          label="Buat Layanan"
        />
      </form>
    </Form>
  );
}
