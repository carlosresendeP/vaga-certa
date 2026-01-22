"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <span className="text-xl font-bold text-primary tracking-tight">
              VagaCerta
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
