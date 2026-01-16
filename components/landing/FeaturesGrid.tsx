import { SectionContainer } from "@/components/ui/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaRobot,
  FaSearch,
  FaLinkedin,
  FaFileExport,
  FaLock,
  FaBolt,
} from "react-icons/fa";

export default function FeaturesGrid() {
  const features = [
    {
      icon: <FaRobot className="h-6 w-6 text-primary" />,
      title: "IA de Última Geração",
      description:
        "Modelos treinados especificamente em recrutamento e seleção para reescrever seu perfil.",
    },
    {
      icon: <FaSearch className="h-6 w-6 text-primary" />,
      title: "Análise de Palavras-chave",
      description:
        "Identificamos os termos exatos que os robôs (ATS) estão buscando na sua vaga.",
    },
    {
      icon: <FaFileExport className="h-6 w-6 text-primary" />,
      title: "Exportação Flexível",
      description:
        "Baixe em PDF otimizado ou Word editável para ajustes finais.",
    },
    {
      icon: <FaLinkedin className="h-6 w-6 text-primary" />,
      title: "Otimização LinkedIn",
      description:
        "Não pare no currículo. Receba sugestões para tornar seu perfil do LinkedIn irresistível.",
    },
    {
      icon: <FaLock className="h-6 w-6 text-primary" />,
      title: "Privacidade Total",
      description:
        "Seus dados são seus. Não compartilhamos suas informações com recrutadores sem permissão.",
    },
    {
      icon: <FaBolt className="h-6 w-6 text-primary" />,
      title: "Análise Instantânea",
      description:
        "Resultados em menos de 10 segundos. Otimize vários currículos por dia.",
    },
  ];

  return (
    <SectionContainer className="bg-background">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Tudo o que você precisa
        </h2>
        <p className="text-lg text-muted-foreground">
          Ferramentas poderosas para colocar sua carreira no modo turbo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:border-primary/50 transition-colors cursor-default"
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-lg font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
