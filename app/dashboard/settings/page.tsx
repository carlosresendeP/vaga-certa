import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/dashboard/settings/ProfileForm";
import { SecurityForm } from "@/components/dashboard/settings/SecurityForm";
import { BillingSection } from "@/components/dashboard/settings/BillingSection";
import { DeleteAccountSection } from "@/components/dashboard/settings/DeleteAccountSection";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações de perfil, segurança e assinatura.
        </p>
      </div>

      <Separator />

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Perfil</h2>
          <ProfileForm user={session.user} />
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold mb-4">Segurança</h2>
          <SecurityForm />
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold mb-4">Assinatura</h2>
          <BillingSection />
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Zona de Perigo
          </h2>
          <DeleteAccountSection />
        </section>
      </div>
    </div>
  );
}
