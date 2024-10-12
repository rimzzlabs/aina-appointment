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
import { signInAction } from "./__action";
import { useSession } from "next-auth/react";
import { pipe, S } from "@mobily/ts-belt";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "./__schema";
import { z } from "zod";

export function SignInForm() {
  let session = useSession();

  let form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading("Memproses...");
    let res = await signInAction(values);
    toast.dismiss();
    if (res?.error) {
      let isInvalidCredentials = pipe(
        res.error,
        S.toLowerCase,
        S.includes("tidak valid")
      );
      if (isInvalidCredentials) {
        form.setError("password", { message: res.error });
      }
      return toast.error(res.error);
    }
    toast.success("Berhasil!");
    await session.update();
  });

  return (
    <TabsContent value="signin">
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
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </TabsContent>
  );
}
