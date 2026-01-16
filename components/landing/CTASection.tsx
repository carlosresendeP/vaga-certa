import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/page";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <SectionContainer
      className="bg-primary/5 border-y border-primary/10"
      id="cta"
    >
      <div className="text-center max-w-3xl mx-auto py-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Pronto para conquistar sua vaga?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-balance">
          Pare de perder tempo com currículos que ninguém lê. Otimize seu perfil
          agora e destaque-se para os recrutadores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg h-12 px-8 group font-bold">
            <Link href="/login" className="flex items-center gap-2">
              Otimizar Meu Currículo Agora
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg h-12 px-8">
            <Link href="#how-it-works">Ver Como Funciona</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Teste grátis. Não precisa de cartão de crédito.
        </p>
      </div>
    </SectionContainer>
  );
}
