"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  MdDashboard,
  MdArticle,
  MdSettings,
  MdLogout,
  MdHistory,
} from "react-icons/md";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  // {
  //   title: "Meu Currículo",
  //   href: "/dashboard/resume",
  //   icon: MdArticle,
  // },
  {
    title: "Histórico",
    href: "/dashboard/history",
    icon: MdHistory,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: MdSettings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Saiu com sucesso");
          router.push("/");
        },
      },
    });
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-primary/20 p-1 rounded text-primary">VC</span>
          VagaCerta
        </h2>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-800",
                  pathname === item.href &&
                    "bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg  transition-colors text-primary hover:text-primary-foreground hover:bg-primary/20"
        >
          <MdLogout className="h-5 w-5" />
          <span className="text-lg font-semibold">Sair</span>
        </button>
      </div>
    </aside>
  );
}
