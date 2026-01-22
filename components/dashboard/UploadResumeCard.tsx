"use client";

import { useState } from "react";
import { MdContentCopy, MdRefresh, MdAutoAwesome } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface UploadResumeCardProps {
  usage: number;
  limit: number;
  isPro: boolean;
}

export function UploadResumeCard({
  usage,
  limit,
  isPro,
}: UploadResumeCardProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobVacancy, setJobVacancy] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error("Por favor, cole seu currículo.");
      return;
    }

    // Check limits
    if (!isPro && usage >= limit) {
      toast.error("Você atingiu o limite de análises gratuitas este mês.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobVacancy,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na análise");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Currículo analisado com sucesso!");
      console.log("Analysis Result:", data);

      if (data.data) {
        // Handle object response from generateTailoredResume
        const content =
          typeof data.data === "string"
            ? data.data
            : data.data.markdownContent || JSON.stringify(data.data);
        setAnalysisResult(content);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar currículo. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const usagePercent = isPro ? 0 : (usage / limit) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdAutoAwesome className="text-primary h-6 w-6" />
          Otimizador de Currículo com IA
        </CardTitle>
        <CardDescription>
          Cole seu currículo atual e a vaga desejada para receber uma versão
          otimizada.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!analysisResult ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-text">Seu Currículo Atual</Label>
              <Textarea
                id="resume-text"
                className="min-h-[200px] font-mono text-sm"
                placeholder="Cole o texto do seu currículo aqui..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-vacancy">Vaga Desejada (Opcional)</Label>
              <Textarea
                id="job-vacancy"
                className="min-h-[100px] text-sm"
                placeholder="Cole a descrição da vaga aqui para personalizar o currículo..."
                value={jobVacancy}
                onChange={(e) => setJobVacancy(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleAnalyze}
              disabled={
                isAnalyzing || !resumeText.trim() || (!isPro && usage >= limit)
              }
            >
              {isAnalyzing ? "Analisando..." : "Gerar Currículo Otimizado"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Currículo Gerado</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnalysisResult("");
                    setJobVacancy("");
                    // Keep resumeText for easy adjustment
                  }}
                >
                  <MdRefresh className="mr-2 h-4 w-4" />
                  Nova Análise
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(analysisResult);
                    toast.success("Copiado para a área de transferência!");
                  }}
                >
                  <MdContentCopy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
              </div>
            </div>
            <Textarea
              value={analysisResult}
              onChange={(e) => setAnalysisResult(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="O resultado da análise aparecerá aqui..."
            />
          </div>
        )}

        {!isPro && (
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Uso gratuito mensal</span>
              <span className="font-medium">
                {usage} / {limit} análises
              </span>
            </div>
            <Progress value={usagePercent} className="h-2" />
            {usage >= limit && (
              <p className="text-xs text-red-500 mt-1">
                Limite atingido. Faça upgrade para continuar.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
