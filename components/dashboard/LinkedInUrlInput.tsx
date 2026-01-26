"use client";

import { useState } from "react";
import { MdLink, MdLock, MdAutoFixHigh } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

interface LinkedInUrlInputProps {
  isPro: boolean;
}

export function LinkedInUrlInput({ isPro }: LinkedInUrlInputProps) {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const linkedinOtimizer = false

  const handleAnalyze = async () => {
    if (!url.includes("linkedin.com/in/")) {
      toast.error("Por favor, insira uma URL válida de perfil do LinkedIn.");
      return;
    }

    if (!isPro) {
      toast.info("Análise de LinkedIn é um recurso Pro.");
      return;
    }

    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("Perfil enviado para análise!");
    }, 2000);
  };

  if(!linkedinOtimizer){
    return(
      <div>
        <span className="text-lg text-destructive border border-destructive rounded-md p-2">Não disponivel no momento</span>
      </div>
    )
  }

  return (
    <Card
      className={`w-full ${!isPro ? "opacity-90 relative overflow-hidden" : ""}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdAutoFixHigh className="text-blue-500 h-6 w-6" />
          Otimização de LinkedIn
        </CardTitle>
        <CardDescription>
          Receba dicas de IA para melhorar seu perfil e atrair recrutadores.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isPro && (
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-black/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6">
            <div className="bg-background/90 p-6 rounded-xl shadow-lg border border-border max-w-sm">
              <MdLock className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Recurso Premium</h3>
              <p className="text-sm text-slate-500 mb-4">
                Desbloqueie análises ilimitadas de perfil do LinkedIn com o
                plano Pro.
              </p>
              <Button asChild className="w-full">
                <Link href="/pricing">Fazer Upgrade</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <div className="relative flex-1">
            <MdLink className="absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="https://linkedin.com/in/seuuser"
              className="pl-9"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={!isPro || analyzing}
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!isPro || analyzing || !url}
          >
            {analyzing ? "Analisando..." : "Analisar"}
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-1">O que a IA analisa?</p>
          <ul className="list-disc pl-4 space-y-1 opacity-80">
            <li>Foto e Banner</li>
            <li>Headline (Título)</li>
            <li>Sobre (Resumo)</li>
            <li>Experiências e palavras-chave</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
