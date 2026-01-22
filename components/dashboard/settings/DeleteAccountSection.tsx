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
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DeleteAccountSection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await authClient.deleteUser({
        callbackURL: "/sign-up", // Redirect after deletion
      }); // Check better-auth docs if parameters needed
      toast.success("Conta excluída com sucesso.");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao excluir conta.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900">
      <h3 className="text-red-600 font-medium mb-2">Excluir Conta</h3>
      <p className="text-sm text-red-600/80 mb-4">
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
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {loading ? "Excluindo..." : "Sim, excluir conta"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
