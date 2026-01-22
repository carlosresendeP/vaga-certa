"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpValues } from "@/lib/schemas";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignUpFormProps {
  children: React.ReactNode;
}

const SignUpForm = ({ children }: SignUpFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  {
    /* Email Sign Up */
  }
  const onSubmit = async (data: SignUpValues) => {
    setServerError(null);

    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.success("Conta criada com sucesso");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setServerError(
            ctx.error.message || "Ocorreu um erro ao criar a conta.",
          );
        },
      },
    );
  };

  {
    /* Google Sign In */
  }
  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Crie sua conta para começar</CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Criar Conta
          </Button>
        </form>

        <div className="my-4 flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OU</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Continuar com Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
