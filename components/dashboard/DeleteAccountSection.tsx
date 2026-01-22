"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAccountSection() {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    await authClient.deleteUser({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta excluída com sucesso.");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Erro ao excluir conta.");
        },
      },
    });
  };

  return (
    <Card className="border-destructive/20 bg-destructive/5 mt-8">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Zona de Perigo
        </CardTitle>
        <CardDescription>Ações irreversíveis para sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium text-sm">Excluir conta</p>
            <p className="text-xs text-muted-foreground">
              Isso excluirá permanentemente sua conta e todos os seus dados.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Excluir Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  sua conta e removerá seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Sim, excluir minha conta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
