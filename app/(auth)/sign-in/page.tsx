import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Entrar | VagaCerta",
  description: "Acesse sua conta no VagaCerta",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <LoginForm />
    </div>
  );
}
