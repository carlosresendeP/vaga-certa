"use client";
import { parseResume } from "@/lib/resume-parser";
import { useRef, useState } from "react";
import {
  MdContentCopy,
  MdRefresh,
  MdAutoAwesome,
  MdCloudUpload,
  MdDownload,
} from "react-icons/md";
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
import Link from "next/link";

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
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Por favor, selecione um arquivo PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 5MB.");
      return;
    }

    setIsParsing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha ao ler o PDF");
      }

      const data = await response.json();
      if (data.text) {
        setResumeText(data.text);
        toast.success("PDF importado com sucesso!");
      } else {
        toast.error("Não foi possível extrair texto deste PDF.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar o arquivo.");
    } finally {
      setIsParsing(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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

  const resumeSections = parseResume(analysisResult);
  const usagePercent = isPro ? 0 : (usage / limit) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdAutoAwesome className="text-primary h-6 w-6" />
          Otimizador de Currículo com IA
        </CardTitle>
        <CardDescription>
          Cole seu currículo ou só o resumo atual e a vaga desejada para receber
          uma versão otimizada.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!analysisResult ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="resume-text">Seu Currículo Atual</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isParsing || isAnalyzing}
                  >
                    {isParsing ? (
                      <MdRefresh className="mr-2 h-3 w-3 animate-spin" />
                    ) : (
                      <MdCloudUpload className="mr-2 h-4 w-4" />
                    )}
                    {isParsing ? "Lendo PDF..." : "Importar PDF"}
                  </Button>
                </div>
              </div>
              <Textarea
                id="resume-text"
                className="min-h-[200px] font-mono text-sm"
                placeholder="Cole o texto do seu currículo aqui ou importe um PDF..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                disabled={isAnalyzing || isParsing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-vacancy">Vaga Desejada</Label>
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

                {/* Redireciona para a history */}
                <Button variant="default" size="sm" className="hover:bg-success hover:text-primary-foreground" >
                  <Link href={"/dashboard/history"} className="flex items-center gap-2 ">
                    <MdDownload className="mr-2 h-4 w-4 " />
                    Baixar
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {resumeSections.map((section, index) => (
                <Card key={index} className="bg-muted/50 border-dashed">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base font-semibold">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 pb-4">
                    <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {section.content.trim()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hidden Input for raw data if needed later */}
            <input type="hidden" name="rawResume" value={analysisResult} />
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
