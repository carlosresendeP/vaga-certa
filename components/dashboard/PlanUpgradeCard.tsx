import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdCheck, MdAutoAwesome } from "react-icons/md";
import { ClaimSubscriptionDialog } from "./ClaimSubscriptionDialog";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function PlanUpgradeCard() {
  const { data: session } = authClient.useSession();

  const handleUpgrade = () => {
    const url = process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PRO;
    if (url) {
      const checkoutUrl = new URL(url);
      if (session?.user?.email) {
        checkoutUrl.searchParams.set("email", session.user.email);
      }
      window.open(checkoutUrl.toString(), "_blank");
    } else {
      toast.error("Link de checkout não configurado.");
    }
  };

  return (
    <Card className="border-primary/50 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <MdAutoAwesome className="w-24 h-24 text-primary" />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          VagaCerta Pro
          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
            Recomendado
          </span>
        </CardTitle>
        <CardDescription>
          Aumente suas chances de contratação com recursos premium.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MdCheck className="w-4 h-4 text-green-500" />
            <span>Destaque para recrutadores</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MdCheck className="w-4 h-4 text-green-500" />
            <span>Acesso antecipado a vagas</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MdCheck className="w-4 h-4 text-green-500" />
            <span>Análise de currículo com IA</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleUpgrade}
          className="w-full bg-linear-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg shadow-green-500/20"
        >
          Fazer Upgrade Agora
        </Button>
        <div className="flex justify-center w-full">
          <ClaimSubscriptionDialog />
        </div>
      </CardFooter>
    </Card>
  );
}
