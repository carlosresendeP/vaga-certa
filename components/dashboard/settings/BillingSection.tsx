"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BillingSection() {
  const handleManageSubscription = () => {
    // Placeholder for billing portal redirection (Stripe, etc.)
    toast.info("Redirecionando para o portal de cobrança...");
  };

  return (
    <div className="max-w-md space-y-4">
      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Plano Atual</h3>
          <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            Free
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Você está utilizando o plano gratuito com recursos limitados.
        </p>
        <div className="flex gap-2">
          <Button variant="default" onClick={handleManageSubscription}>
            Fazer Upgrade
          </Button>
          {/* 
            <Button variant="outline" onClick={handleManageSubscription}>
                Gerenciar Assinatura
            </Button>
            */}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Para cancelar sua assinatura, acesse o portal de gerenciamento.
      </p>
    </div>
  );
}
