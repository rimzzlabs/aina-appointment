"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { changePasswordSchema } from "./__schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changePasswordAction } from "./__action";

export function ChangePasswordForm(props: { id: string }) {
  let form = useForm<z.infer<typeof changePasswordSchema>>({
    defaultValues: { oldPassword: "", newPassword: "", id: props.id },
    resolver: zodResolver(changePasswordSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses..");

    let res = await changePasswordAction(values);
    toast.dismiss();

    if (res === "invalid old password") {
      form.setError("oldPassword", {
        message: "Password lama tidak cocok dengan yang ada di databse",
      });
      return toast.error("Password lama salah");
    }

    if (res !== "success") return toast.error("Terjadi kesalahan pada server");

    form.reset();
    toast.success("Update password berhasil");
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={onSubmit} className="max-w-2xl">
          <CardContent>
            <div className="space-y-4">
              <FormField
                name="oldPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Lama</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="Password lama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password baru</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="Password baru" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Update
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
