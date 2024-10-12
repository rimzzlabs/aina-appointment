import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm, SignUpForm } from "@/features/auth";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl">
        <Tabs defaultValue="signin">
          <CardHeader>
            <TabsList>
              <TabsTrigger className="w-full" value="signin">
                Login
              </TabsTrigger>
              <TabsTrigger className="w-full" value="signup">
                Register
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <SignInForm />
          <SignUpForm />
        </Tabs>
      </Card>
    </div>
  );
}
