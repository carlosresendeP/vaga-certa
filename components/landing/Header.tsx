"use client";

import Link from "next/link";
import { Briefcase, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
              <Briefcase
                className="w-5 h-5 text-primary-foreground"
                strokeWidth={2.5}
              />
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border-2 border-background">
                <Check className="w-3.5 h-3.5 text-primary stroke-3" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary/90 transition-colors">
              Vaga<span className="text-primary">Certa</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="#problem"
            className="hover:text-primary transition-colors"
          >
            Problema
          </Link>
          <Link
            href="#solution"
            className="hover:text-primary transition-colors"
          >
            Solução
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-primary transition-colors"
          >
            Como Funciona
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button>Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
