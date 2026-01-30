import { SectionContainer } from "@/components/ui/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaClock, FaChartLine, FaBriefcase } from "react-icons/fa";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <FaChartLine className="h-10 w-10 text-success" />,
      title: "3x Mais Entrevistas",
      description:
        "Nossos usuários relatam triplicar o número de convites para entrevistas na primeira semana.",
    },
    {
      icon: <FaClock className="h-10 w-10 text-primary" />,
      title: "Economize Horas",
      description:
        "Pare de ajustar currículos manualmente para cada vaga. Nossa IA faz isso em segundos.",
    },
    {
      icon: <FaBriefcase className="h-10 w-10 text-blue-400" />,
      title: "Salários Maiores",
      description:
        "Currículos bem estruturados passam autoridade e negociam melhores ofertas salariais.",
    },
  ];

  return (
    <SectionContainer className="bg-background">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Resultados Reais
        </h2>
        <p className="text-lg text-muted-foreground">
          Não é apenas sobre design, é sobre conseguir a vaga que você merece.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border-none shadow-none bg-secondary/30">
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 p-3 bg-background rounded-2xl shadow-sm">
                {benefit.icon}
              </div>
              <CardTitle className="text-xl font-bold text-center">
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {benefit.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
