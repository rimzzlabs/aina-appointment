"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProductSchema } from "../__schema";
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
import { popModal } from "@/components/modals";
import { updateProductAction } from "../__action";
import CurrencyInput from "react-currency-input-field";
import { omit } from "radash";
import { Textarea } from "@/components/ui/textarea";

type TProductListUpdateForm = Pick<
  Product,
  "id" | "name" | "description" | "price"
>;
export function ProductListUpdateForm(props: TProductListUpdateForm) {
  let form = useForm<z.infer<typeof updateProductSchema>>({
    defaultValues: {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
    },
    resolver: zodResolver(updateProductSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await updateProductAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    popModal("ModalForm");
    toast.success("Berhasil memperbarui produk");
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
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Skintific Smooth"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Produk</FormLabel>
                <CurrencyInput
                  customInput={Input}
                  allowNegativeValue={false}
                  allowDecimals={false}
                  min={0}
                  {...omit(field, ["onChange"])}
                  placeholder="Rp. 10.000"
                  groupSeparator="."
                  decimalSeparator=","
                  prefix="Rp. "
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Produk</FormLabel>
                <Textarea {...field} placeholder="MAX 255 Karakter" />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ModalFormFooter
          disabled={form.formState.isSubmitting}
          label="update"
        />
      </form>
    </Form>
  );
}
