"use client";

import { useEffect, useState } from "react";
import { parseResume } from "@/lib/resume-parser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdContentCopy, MdDelete, MdDownload, MdHistory } from "react-icons/md";
import { toast } from "sonner";

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

  const downloadResume = (content: string) => {
    // Parse content to get sections
    const sections = parseResume(content);

    // Construct HTML content for the .doc file
    // Simple HTML structure that Word interprets correctly
    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Currículo Otimizado</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; }
          h1 { color: #2E74B5; font-size: 16pt; text-transform: uppercase; margin-bottom: 20px; }
          h2 { color: #2E74B5; font-size: 14pt; margin-top: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          p { margin-bottom: 10px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
    `;

    sections.forEach((section) => {
      // Check if it's the main header (Name) or a subsection
      // Our parser treats the first # section as title "Dados Pessoais" or similar if logic matches
      // But typically parseResume returns title/content.
      // If the title looks like a name, use h1, else h2.
      // For simplicity, we stick to the sections structure.

      htmlContent += `<h2>${section.title}</h2>`;
      // Convert newlines to breaks or paragraphs
      const paragraphs = section.content.split("\n").filter((p) => p.trim());
      paragraphs.forEach((p) => {
        htmlContent += `<p>${p}</p>`;
      });
    });

    htmlContent += `</body></html>`;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "curriculo_otimizado.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteCV = async (id: string) => {
    try {
      const response = await fetch(`/api/resume/history/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Currículo excluído com sucesso!");
        //refresh the page
        window.location.reload();
        fetchHistory();
      } else {
        throw new Error("Falha ao excluir");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir currículo.");
    }
  };

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
          {history.map((item) => {
            const sections = parseResume(item.generatedResume);
            return (
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
                  <div className="flex justify-end items-center mb-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(item.generatedResume)}
                    >
                      <MdContentCopy className="mr-2 h-4 w-4" />
                      Copiar Currículo
                    </Button>
                    <Button
                      size="sm"
                      className="hover:bg-green-600"
                      onClick={() => downloadResume(item.generatedResume)}
                    >
                      <MdDownload className="mr-2 h-4 w-4" />
                      Baixar Currículo
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCV(item.id)}
                    >
                      <MdDelete className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {sections.map((section, idx) => (
                      <Card key={idx} className="bg-muted/50 border-dashed">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
