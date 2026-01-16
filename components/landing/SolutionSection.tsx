import { FaCheckCircle, FaMagic, FaRocket } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/page";

export default function SolutionSection() {
  return (
    <div className="bg-blue-50/50">
      <SectionContainer id="solution">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold mb-4">
              A Solução Definitiva
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Fale a língua que os recrutadores querem ouvir
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nossa tecnologia analisa a descrição da vaga e reestrutura seu
              currículo para destacar exatamente o que a empresa busca,
              garantindo uma pontuação alta nos sistemas de triagem.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Análise semântica avançada da descrição da vaga",
                "Sugestão inteligente de palavras-chave faltantes",
                "Otimização de formatação amigável para ATS",
                "Geração de resumo profissional persuasivo",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 h-5 w-5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="rounded-full px-8">
              Experimentar Grátis
            </Button>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
            <div className="relative bg-background p-6 rounded-2xl shadow-xl border border-blue-100">
              {/* Abstract UI representation of Resume Analysis */}
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaMagic className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">ATS Score</div>
                    <div className="text-xs text-muted-foreground">
                      Análise em tempo real
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-500">98/100</div>
              </div>

              <div className="space-y-3">
                <div className="h-2 bg-secondary rounded overflow-hidden">
                  <div className="h-full bg-blue-500 w-[98%]"></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Relevância</span>
                  <span>Alta</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-start gap-3">
                  <FaCheckCircle className="mt-1 text-green-500" />
                  <div className="text-sm">
                    <span className="font-semibold text-green-800">
                      Palavras-chave encontradas:
                    </span>
                    <p className="text-green-700">
                      React, Next.js, Tailwind, TypeScript (100% match)
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                  <FaRocket className="mt-1 text-blue-500" />
                  <div className="text-sm">
                    <span className="font-semibold text-blue-800">
                      Impacto:
                    </span>
                    <p className="text-blue-700">
                      Seu perfil está no Top 5% dos candidatos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
