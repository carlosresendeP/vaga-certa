import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Criar Conta | VagaCerta",
  description: "Crie sua conta no VagaCerta",
};

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <SignUpForm>
        <div>
          <h1>Criar Conta</h1>
        </div>
      </SignUpForm>
    </div>
  );
}
