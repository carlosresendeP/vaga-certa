import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "Remoto",
    match: "98%",
    posted: "Há 2 horas",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartUp Inc",
    location: "São Paulo, SP",
    match: "95%",
    posted: "Há 5 horas",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InovaWeb",
    location: "Híbrido",
    match: "90%",
    posted: "Ontem",
  },
];

export function JobMatchList() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Vagas Recomendadas</CardTitle>
        <CardDescription>Baseado no seu perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockJobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{job.title}</h3>
                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                  Match {job.match}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.company} • {job.location}
              </p>
              <p className="text-xs text-muted-foreground">{job.posted}</p>
            </div>
            <Button variant="ghost" size="sm">
              Ver Vaga
            </Button>
          </div>
        ))}
        <Button variant="link" className="w-full text-muted-foreground">
          Ver todas as vagas
        </Button>
      </CardContent>
    </Card>
  );
}
