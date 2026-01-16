import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { PageContainer, SectionContainer } from "@/components/ui/page";

export default function Hero() {
  return (
    <PageContainer className="relative overflow-hidden bg-background">
      <SectionContainer className="pt-24 pb-20 md:pt-32 md:pb-28 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up border border-blue-100 mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Nova IA Otimizadora V2.0 Disponível
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight animate-fade-in-up delay-100 max-w-5xl mx-auto">
          Passe pelos{" "}
          <span className="text-primary bg-blue-50/50 px-2 rounded-lg">
            Robôs de RH
          </span>{" "}
          e <br className="hidden md:block" /> Conquiste sua Entrevista
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Pare de enviar currículos para o &quot;buraco negro&quot;. Otimize seu
          perfil para sistemas ATS e aumente em até{" "}
          <span className="text-foreground font-semibold">3x suas chances</span>{" "}
          de ser chamado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
          <Button
            size="lg"
            className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-500/20 w-full sm:w-auto hover:scale-105 transition-transform"
          >
            Otimizar Currículo Agora
            <FaArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg rounded-full border-2 w-full sm:w-auto hover:bg-secondary/50"
          >
            Ver Exemplo Real
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up delay-500">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-4 w-4 text-green-500" /> Teste Grátis
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-4 w-4 text-green-500" /> Sem Cartão
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-4 w-4 text-green-500" /> IA Avançada
          </div>
        </div>
      </SectionContainer>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
    </PageContainer>
  );
}
