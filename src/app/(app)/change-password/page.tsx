import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePasswordForm } from "@/features/change-password";
import { auth } from "@/lib/auth";
import { Fragment } from "react";

export default async function ChangePasswordPage() {
  let session = await auth();

  let user = session?.user;
  if (!user) return null;

  return (
    <Fragment>
      <Heading>Halo {user.name}</Heading>
      <Tabs defaultValue="security">
        <TabsList>
          <TabsTrigger value="security">Ubah Password</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <ChangePasswordForm key={user.id} id={user.id} />
        </TabsContent>
      </Tabs>
    </Fragment>
  );
}
