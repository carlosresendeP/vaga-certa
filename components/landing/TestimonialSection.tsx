import { SectionContainer } from "@/components/ui/page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Ricardo Silva",
      role: "Desenvolvedor Backend",
      image: "R",
      text: "Eu estava travado em filtros de RH por meses. Depois de otimizar com o VagaCerta, consegui 3 entrevistas na Google e Amazon em uma semana.",
    },
    {
      name: "Juliana Costa",
      role: "Product Owner",
      image: "J",
      text: "A análise de palavras-chave é surreal. A ferramenta me mostrou exatamente o que faltava no meu perfil para as vagas de liderança.",
    },
    {
      name: "Carlos Mendes",
      role: "Engenheiro de Dados",
      image: "C",
      text: "Simples, rápido e eficaz. O suporte a múltiplos formatos de exportação me salvou muito tempo nas aplicações.",
    },
  ];

  return (
    <SectionContainer className="bg-secondary/20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Quem já conseguiu
        </h2>
        <p className="text-lg text-muted-foreground">
          Junte-se a milhares de profissionais que hackearam o sistema de
          contratação.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <Card key={index} className="bg-background border-border relative">
            <div className="absolute top-6 right-6 text-primary/10">
              <FaQuoteLeft className="h-8 w-8" />
            </div>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {t.image}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              &quot;{t.text}&quot;
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
