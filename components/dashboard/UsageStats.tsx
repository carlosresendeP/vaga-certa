"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MdTrendingUp, MdCheck } from "react-icons/md";

interface UsageStatsProps {
  uploadsUsage: number;
  uploadsLimit: number;
  isPro: boolean;
}

export function UsageStats({ uploadsUsage, uploadsLimit }: UsageStatsProps) {
  const uploadPercent = (uploadsUsage / uploadsLimit) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Uso Mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <MdTrendingUp className="text-primary" /> Análises de Currículo
            </span>
            <span className="font-bold">
              {uploadsUsage} / {uploadsLimit}
            </span>
          </div>
          <Progress value={uploadPercent} className="h-2" />
        </div>

        {/* <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-blue-500">
              <MdCheck /> Otimização LinkedIn
            </span>
            <span
              className={`font-bold ${isPro ? "text-green-500" : "text-slate-400"}`}
            >
              {isPro ? "Ativo" : "Bloqueado"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-violet-500">
              <MdTrendingUp /> Carta de Apresentação
            </span>
            <span
              className={`font-bold ${isPro ? "text-green-500" : "text-slate-400"}`}
            >
              {isPro ? "Ativo" : "Bloqueado"}
            </span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
