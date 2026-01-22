"use client";
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
import { JSX, useState } from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  developer?: boolean;
}

export default function FeaturesGrid() {
  const [isDeveloper, setIsDeveloper] = useState(false);

  const featuresList: FeatureProps[] = [
    {
      icon: <FaRobot className="h-6 w-6 text-primary" />,
      title: "IA de Última Geração",
      description:
        "Modelos treinados especificamente em recrutamento e seleção para reescrever seu perfil.",
      developer: true,
    },
    {
      icon: <FaSearch className="h-6 w-6 text-primary" />,
      title: "Análise de Palavras-chave",
      description:
        "Identificamos os termos exatos que os robôs (ATS) estão buscando na sua vaga.",
      developer: isDeveloper,
    },
    {
      icon: <FaFileExport className="h-6 w-6 text-primary" />,
      title: "Exportação Flexível",
      description:
        "Baixe em PDF otimizado ou Word editável para ajustes finais.",
      developer: isDeveloper,
    },
    {
      icon: <FaLinkedin className="h-6 w-6 text-primary" />,
      title: "Otimização LinkedIn",
      description:
        "Não pare no currículo. Receba sugestões para tornar seu perfil do LinkedIn irresistível.",
      developer: true,
    },
    {
      icon: <FaLock className="h-6 w-6 text-primary" />,
      title: "Privacidade Total",
      description:
        "Seus dados são seus. Não compartilhamos suas informações com recrutadores sem permissão.",
      developer: isDeveloper,
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {featuresList.map((feature, index) => (
          <Card
            key={index}
            className={`relative transition-colors cursor-default overflow-hidden ${
              feature.developer
                ? "bg-secondary/50 opacity-80 hover:border-primary/50"
                : "hover:border-primary/50 bg-card"
            }`}
          >
            {feature.developer && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/20 backdrop-blur-[1px]">
                <div className="bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-full w-fit h-12 text-center flex items-center justify-center 
                text-sm font-bold shadow-lg transform -rotate-y-2 hover:hidden">
                  Em Breve
                </div>
              </div>
            )}
            <CardHeader className={feature.developer ? "opacity-40" : ""}>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-lg font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent
              className={`text-sm text-muted-foreground ${feature.developer ? "opacity-40" : ""}`}
            >
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
