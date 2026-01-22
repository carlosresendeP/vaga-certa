import { SectionContainer } from "@/components/ui/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaCheck } from "react-icons/fa";

export default function PricingSection() {


  return (
    <SectionContainer className="bg-secondary/20" id="pricing">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Planos Transparentes
        </h2>
        <p className="text-lg text-muted-foreground">
          Comece grátis e faça o upgrade quando conseguir sua entrevista.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="flex flex-col border-border shadow-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Free</CardTitle>
            <p className="text-muted-foreground">Para quem está começando</p>
            <div className="py-4">
              <span className="text-4xl font-bold">R$ 0</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-success" /> 5 Otimizações de
                Currículo/mês
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-success" /> Análise Básica de
                ATS
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-success" /> Copie para o seu currículo
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Começar Grátis
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col border-primary border-2 shadow-lg relative bg-background/50 scale-105 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1 shadow-md">
              Mais Popular
            </Badge>
          </div>
          <CardHeader className="text-center pb-2 pt-10">
            <CardTitle className="text-2xl font-bold text-primary">
              Pro
            </CardTitle>
            <p className="text-muted-foreground">
              Para quem quer resultados rápidos
            </p>
            <div className="py-4">
              <span className="text-4xl font-bold">R$ 9,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>

          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-success" /> Otimizações
                Ilimitadas
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-success" /> Copie para o seu currículo
              </li>
              <li className=" gap-2">
                <p className="line-through flex items-center text-muted-foreground">
                  <FaCheck className="h-4 w-4 text-success" /> Otimização de
                  Perfil LinkedIn
                </p>
              </li>
              <li className=" gap-2">
                <p className="line-through flex items-center text-muted-foreground">
                  <FaCheck className="h-4 w-4 text-success " /> Gerador de Carta
                  de Apresentação
                </p>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 text-lg shadow-blue-200 shadow-lg">
              Assinar Pro
            </Button>
          </CardFooter>
        </Card>

        {/* Lifetime Plan */}
        <Card className="flex flex-col border-purple-500 border shadow-sm relative overflow-hidden bg-purple-50/10">
          <div className="absolute top-0 right-0 p-2">
            <Badge
              variant="outline"
              className="border-purple-500 text-purple-600"
            >
              Anual
            </Badge>
          </div>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-purple-700">
              Pro - Anual
            </CardTitle>
            <p className="text-muted-foreground">Plano anual com desconto</p>
            <div className="py-4">
              <span className="text-4xl font-bold">R$ 97</span>
              <span className="text-muted-foreground">/ano</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-purple-600" />{" "}
                <strong>Acesso Anual</strong>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-purple-600" /> Todas as
                atualizações
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="h-4 w-4 text-purple-600" /> Prioridade no
                Suporte
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Garantir Lifetime
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center text-muted-foreground mt-20 bg-destructive/10 border border-destructive/10 p-2 rounded">
          <p className="text-lg font-bold text-destructive rounded ">EM BREVE LANÇAREMOS A OTIMIZAÇÃO LINKEDIN E A CARTA DE APRESENTAÇÃO</p>
          <p className="text-sm text-destructive/50">O preço vai ser R$ <strong>19,90/mês</strong></p>
      </div>
    </SectionContainer>
  );
}
