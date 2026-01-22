import { FaCloudUploadAlt, FaMagic, FaFileDownload } from "react-icons/fa";
import { SectionContainer } from "@/components/ui/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaCloudUploadAlt className="h-10 w-10 text-primary" />,
      title: "1. Cole a Vaga e seu CV",
      description:
        "Copie a descrição da vaga desejada e faça upload do seu currículo atual ou texto.",
    },
    {
      icon: <FaMagic className="h-10 w-10 text-primary" />,
      title: "2. Nossa IA Otimiza",
      description:
        "Em segundos, analisamos a compatibilidade e reescrevemos os pontos chave para máxima aderência.",
    },
    {
      icon: <FaFileDownload className="h-10 w-10 text-primary" />,
      title: "3. Baixe e Aplique",
      description:
        "Receba seu novo CV otimizado para ATS e aplique para a vaga com confiança total.",
    },
  ];

  return (
    <SectionContainer className="bg-background" id="how-it-works">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Como funciona</h2>
        <p className="text-lg text-muted-foreground">
          Três passos simples separam você da sua próxima entrevista.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>

        {steps.map((step, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center text-center bg-card border border-border shadow-sm hover:shadow-md transition-shadow relative"
          >
            <CardHeader className="flex flex-col items-center justify-center pb-2 w-full">
              <div className="w-20 h-20 bg-background rounded-full border-4 border-blue-50 flex items-center justify-center mb-6 z-10">
                {step.icon}
              </div>
              <CardTitle className="text-xl font-bold mb-3">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </CardContent>

            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
