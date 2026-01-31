"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { claimSubscription } from "@/app/actions/subscription";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ClaimSubscriptionDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await claimSubscription(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        setOpen(false);
        router.refresh();
      }
    } catch {
      toast.error("Ocorreu um erro ao tentar vincular a assinatura.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-xs text-muted-foreground underline"
        >
          Já assinou com outro email?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Assinatura</DialogTitle>
          <DialogDescription>
            Se você realizou o pagamento usando um email diferente do seu
            cadastro atual, insira-o abaixo para vincular sua assinatura.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentEmail">Email de Pagamento</Label>
            <Input
              id="paymentEmail"
              name="paymentEmail"
              type="email"
              placeholder="exemplo@payment.com"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verificando..." : "Vincular Assinatura"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
