"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function DeleteAccountSection() {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Conta excluída com sucesso.");
            window.location.href = "/"; // Force hard refresh/logout
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Erro ao excluir conta.");
            setLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Erro ao excluir conta.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900">
      <h3 className="text-destructive font-medium mb-2">Excluir Conta</h3>
      <p className="text-sm text-destructive/80 mb-4">
        Atenção: A exclusão da conta é uma ação permanente e não pode ser
        desfeita. Todos os seus dados serão perdidos.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={loading}>
            Excluir Minha Conta
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e removerá seus dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90 focus:ring-destructive"
            >
              {loading ? "Excluindo..." : "Sim, excluir conta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
