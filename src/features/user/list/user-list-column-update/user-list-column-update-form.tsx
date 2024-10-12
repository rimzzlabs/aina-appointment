"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "../../__schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { closeUpdateUserAtom } from "../../states/user-data-table";
import { updateUserAction } from "../../__action";
import { match } from "ts-pattern";

type UpdateUserForm = { id: string; email: string; name: string };

export function UserListColumnUpdateForm(props: UpdateUserForm) {
  let closeUpdateUser = useSetAtom(closeUpdateUserAtom);

  let form = useForm<z.infer<typeof updateUserSchema>>({
    mode: "all",
    defaultValues: { ...props, skipPassword: true, password: "" },
    resolver: zodResolver(updateUserSchema),
  });

  let isSkipPassword = useWatch({
    control: form.control,
    name: "skipPassword",
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses..");
    let res = await updateUserAction(values);
    toast.dismiss();

    if (res?.error) {
      if (res.error === "invalid password") {
        form.setError("password", { message: "Password tidak valid" });
      }

      let toastMessage = match(res.error)
        .with("server error", () => "Server error, harap coba lagi")
        .with("invalid password", () => "Password tidak valid")
        .otherwise(() => "Server errror");

      return toast.error(toastMessage);
    }
    closeUpdateUser();
    toast.success("Berhasil mengupdate user");
  });

  useEffect(() => {
    if (isSkipPassword) {
      form.setValue("password", "", { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkipPassword]);

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
                    disabled={isSkipPassword || form.formState.isSubmitting}
                    placeholder="Minimal berisikan 8 karakter"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="skipPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="inline-flex flex-row-reverse items-center gap-x-2">
                  <FormLabel>Skip password</FormLabel>
                  <FormControl>
                    <Checkbox
                      ref={field.ref}
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  Centang ini jika ingin melewati perubahan password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Update
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
