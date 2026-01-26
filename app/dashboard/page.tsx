import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Assuming prisma client is exported from here
import { UploadResumeCard } from "@/components/dashboard/UploadResumeCard";
import { LinkedInUrlInput } from "@/components/dashboard/LinkedInUrlInput";
import { UsageStats } from "@/components/dashboard/UsageStats";
import { PlanUpgradeCard } from "@/components/dashboard/PlanUpgradeCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard"; // Reuse existing

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Fetch full user data including plan and usage
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { usage: true },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const isPro = user.plan === "PRO";
  const uploadsLimit = isPro ? 999 : 5;
  const uploadsUsage = user.usage?.resumeUploads || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus currículos e otimize seu perfil profissional.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${isPro ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}
          >
            {isPro ? "PLANO PRO" : "PLANO GRATUITO"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <UploadResumeCard
            usage={uploadsUsage}
            limit={uploadsLimit}
            isPro={isPro}
          />

          <div>
            <h2 className="text-xl font-bold mb-4">Otimização de LinkedIn</h2>
            <LinkedInUrlInput isPro={isPro} />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <ProfileCard user={session.user} />

          <UsageStats
            uploadsUsage={uploadsUsage}
            uploadsLimit={uploadsLimit}
            isPro={isPro}
          />

          {!isPro && <PlanUpgradeCard />}
        </div>
      </div>
    </div>
  );
}
