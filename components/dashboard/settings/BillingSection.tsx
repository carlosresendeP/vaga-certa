"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function BillingSection() {
  const { data: session, isPending } = authClient.useSession();
  const plan = ((session?.user as any)?.plan as string) || "FREE"; // Cast as string in case inference misses custom fields

  const isFree = plan === "FREE";

  const handleManageSubscription = () => {
    // Placeholder for billing portal redirection
    if (isFree) {
      toast.info("Iniciando fluxo de upgrade...");
    } else {
      toast.info("Redirecionando para o portal de cobrança...");
    }
  };

  if (isPending) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-20">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Plano Atual</CardTitle>
            <CardDescription>
              Gerencie sua assinatura e cobrança.
            </CardDescription>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              isFree
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
            }`}
          >
            {plan === "FREE"
              ? "Plano Gratuito"
              : plan === "PRO"
                ? "Plano Pro"
                : "Plano Anual"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Você está atualmente no plano{" "}
          <strong>
            {plan === "FREE" ? "Gratuito" : plan === "ANNUAL" ? "Anual" : "Pro"}
          </strong>
          .
        </p>

        {!isFree && (
          <p className="text-xs text-red-500/80 dark:text-red-400/80 bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/20">
            Ao cancelar sua assinatura, você será desvinculado do plano atual e
            não terá mais acesso a funcionalidades premium.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant={isFree ? "default" : "outline"}
          onClick={handleManageSubscription}
          className={
            !isFree
              ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
              : ""
          }
        >
          {isFree ? "Fazer Upgrade" : "Cancelar Assinatura"}
        </Button>
      </CardFooter>
    </Card>
  );
}
