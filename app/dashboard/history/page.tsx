"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdContentCopy, MdHistory } from "react-icons/md";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface ResumeHistoryItem {
  id: string;
  originalText: string;
  jobVacancy: string | null;
  generatedResume: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/resume/history");
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar histórico.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado com sucesso!");
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando histórico...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MdHistory className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Histórico de Currículos</h1>
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Você ainda não gerou nenhum currículo otimizado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Gerado em{" "}
                  {new Date(item.createdAt).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                </CardTitle>
                <CardDescription>
                  {item.jobVacancy
                    ? `Vaga: ${item.jobVacancy.slice(0, 100)}...`
                    : "Sem descrição de vaga específica"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  readOnly
                  value={item.generatedResume}
                  className="min-h-[150px] font-mono text-sm bg-muted/50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(item.generatedResume)}
                >
                  <MdContentCopy className="mr-2 h-4 w-4" />
                  Copiar Currículo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
