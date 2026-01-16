import { FaTimesCircle, FaRobot, FaFileAlt } from "react-icons/fa";
import { SectionContainer } from "@/components/ui/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProblemSection() {
  return (
    <SectionContainer className="bg-background relative" id="problem">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Por que você não é chamado para entrevistas?
        </h2>
        <p className="text-lg text-muted-foreground">
          A verdade dolorosa: 75% dos currículos são rejeitados automaticamente
          antes mesmo de um humano ler.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Problem 1 */}
        <Card className="hover:border-red-200 transition-colors group border-border bg-secondary/20">
          <CardHeader>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaRobot className="h-7 w-7 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold mb-3">
              Filtros de ATS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Robôs scaneiam seu CV buscando palavras-chave exatas. Se não
              encontrar, seu currículo vai para o lixo.
            </p>
          </CardContent>
        </Card>

        {/* Problem 2 */}
        <Card className="hover:border-red-200 transition-colors group border-border bg-secondary/20">
          <CardHeader>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaFileAlt className="h-7 w-7 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold mb-3">
              Formatação Incorreta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Colunas duplas, gráficos e fontes complexas confundem a leitura da
              IA, tornando seu perfil &quot;invisível&quot;.
            </p>
          </CardContent>
        </Card>

        {/* Problem 3 */}
        <Card className="hover:border-red-200 transition-colors group border-border bg-secondary/20">
          <CardHeader>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaTimesCircle className="h-7 w-7 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold mb-3">
              Falta de Relevância
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Currículos genéricos não convertem. Cada vaga exige um destaque
              diferente das suas habilidades.
            </p>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
}
