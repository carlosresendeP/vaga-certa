"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ClaimSubscriptionDialog } from "../ClaimSubscriptionDialog";

export function BillingSection() {
  const { data: session, isPending } = authClient.useSession();

  interface UserWithPlan {
    plan?: string;
    planExpiresAt?: string; // Auth client might return ISO string
    email?: string;
  }
  const user = session?.user as unknown as UserWithPlan;

  const now = new Date();
  const planExpiresAt = user?.planExpiresAt
    ? new Date(user.planExpiresAt)
    : null;

  // If plan is PRO but expired, treat as FREE
  let plan = user?.plan || "FREE";
  if (plan === "PRO" && planExpiresAt && planExpiresAt < now) {
    plan = "FREE";
  }

  const isFree = plan === "FREE";

  const handleUpgrade = (url: string) => {
    try {
      if (url) {
        const checkoutUrl = new URL(url);
        if (user?.email) {
          checkoutUrl.searchParams.set("email", user.email);
        }
        window.open(checkoutUrl.toString(), "_blank");
      } else {
        toast.error("Link de checkout não configurado.");
      }
    } catch (error) {
      console.error("Invalid Checkout URL", error);
      toast.error("Erro no link de checkout.");
    }
  };

  const handleManage = () => {
    toast.info(
      "Para gerenciar sua assinatura, verifique seu email da Kiwify ou acesse a plataforma.",
    );
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
    <Card className="max-w-lg">
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
            {plan === "FREE" ? "Plano Gratuito" : "Plano Pro (Mensal)"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Você está atualmente no plano{" "}
          <strong>{plan === "FREE" ? "Gratuito" : plan === "PRO"}</strong>.
        </p>

        {!isFree && (
          <p className="text-xs text-red-500/80 dark:text-red-400/80 bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/20">
            Ao cancelar sua assinatura, você será desvinculado do plano atual e
            não terá mais acesso a funcionalidades premium.
          </p>
        )}

        {/* Logic for Plan Switching/Upgrading */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {isFree && (
            <>
              <Button
                onClick={() =>
                  handleUpgrade(
                    process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PRO || "",
                  )
                }
                className="flex-1"
              >
                Assinar PRO
              </Button>
            </>
          )}

          {isFree && (
            <div className="flex justify-center w-full mt-2 sm:mt-0 sm:w-auto">
              <ClaimSubscriptionDialog />
            </div>
          )}

          {plan === "PRO" && (
            <div className="flex flex-col w-full gap-2">
              <p className="text-xs text-muted-foreground mb-2">
                Para cancelar o plano mensal, clique no botão abaixo:
              </p>
              <Button
                variant="outline"
                onClick={handleManage}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 w-full"
              >
                Cancelar Assinatura Mensal
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
