import { z } from "zod";
import { createProductSchema } from "../../__schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createProductAction } from "../../__action";
import { popModal } from "@/components/modals";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModalFormFooter } from "@/components/modals/modal-form";
import CurrencyInput from "react-currency-input-field";
import { omit } from "radash";
import { Textarea } from "@/components/ui/textarea";

export function ProductListAddForm(props: { onClose: () => void }) {
  let form = useForm<z.infer<typeof createProductSchema>>({
    defaultValues: {
      description: "",
      name: "",
      price: "" as unknown as number,
    },
    resolver: zodResolver(createProductSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await createProductAction(values);
    toast.dismiss();

    if (res?.error) {
      return toast.error(res.error);
    }

    popModal("ModalForm");
    props.onClose();
    toast.success("Berhasil membuat data produk baru");
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

        <ModalFormFooter disabled={form.formState.isSubmitting} label="Buat" />
      </form>
    </Form>
  );
}
