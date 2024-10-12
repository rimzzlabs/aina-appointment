"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInAction, signUpAction } from "./__action";
import { useSession } from "next-auth/react";
import { pipe, S } from "@mobily/ts-belt";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "./__schema";
import { z } from "zod";
import { TabsContent } from "@/components/ui/tabs";

export function SignUpForm() {
  let session = useSession();
  let form = useForm<z.infer<typeof signUpSchema>>({
    mode: "all",
    defaultValues: { email: "", password: "", name: "" },
    resolver: zodResolver(signUpSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses...");
    let res = await signUpAction(values);
    toast.dismiss();
    if (res.error) {
      if (res.error === "Email ini sudah terdaftar") {
        form.setError("email", { message: res.error });
      }
      return toast.error(res.error);
    }

    toast.loading("Memproses kredensial");
    let signInRes = await signInAction({
      email: values.email,
      password: values.password,
    });
    toast.dismiss();

    if (signInRes?.error) {
      let isInvalidCredentials = pipe(
        signInRes.error,
        S.toLowerCase,
        S.includes("tidak valid")
      );
      if (isInvalidCredentials) {
        form.setError("password", { message: signInRes.error });
      }
      return toast.error(res.error);
    }
    toast.success("Pendaftaran berhasil!");
    await session.update();
  });

  return (
    <TabsContent value="signup">
      <CardHeader>
        <CardTitle>Masuk Ke Portal Aina</CardTitle>
        <CardDescription>
          Silahkan masukan alamat email dan kata sandi anda
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Handa Yani" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel>Alamat Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="aina@beauty.com"
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
                <FormItem className="pt-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} placeholder="Password anda" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Register
            </Button>
          </CardFooter>
        </form>
      </Form>
    </TabsContent>
  );
}
