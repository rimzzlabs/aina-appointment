"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserSchema } from "../../__schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserAction } from "../../__action";
import { match } from "ts-pattern";

export function UserListAddForm(props: { onClose: () => void }) {
  let form = useForm<z.infer<typeof createUserSchema>>({
    defaultValues: { email: "", name: "", password: "", role: "customer" },
    resolver: zodResolver(createUserSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses permintaan");
    let res = await createUserAction(values);
    toast.dismiss();

    if (res?.error) {
      if (res.error === "duplicate found") {
        form.setError("email", { message: "Email ini sudah terdaftar" });
      }
      let toastMessage = match(res.error)
        .with("duplicate found", () => "User dengan email ini sudah terdaftar")
        .otherwise(() => "Server error, harap coba lagi");

      return toast.error(toastMessage);
    }
    props.onClose();
    toast.success("Berhasil membuat user baru");
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
                <FormLabel>Nama lengkap user</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nurfitri Handayani"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email user</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="handa@gmail.com"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password user</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    type="password"
                    placeholder="Minimal berisikan 8 karakter"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role user</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger
                      ref={field.ref}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={form.formState.isSubmitting}>
            Batal
          </AlertDialogCancel>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Buat
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
