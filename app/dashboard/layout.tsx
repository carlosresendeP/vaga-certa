import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-zinc-950">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}
