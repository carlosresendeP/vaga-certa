import { SectionContainer } from "@/components/ui/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "O VagaCerta funciona para qualquer área?",
      answer:
        "Sim! Nossa IA é treinada em recrutamento global e entende nuances de diversas indústrias, desde TI e Engenharia até Marketing e Saúde.",
    },
    {
      question: "Garanto meu emprego usando a ferramenta?",
      answer:
        "Nós garantimos que seu currículo terá muito mais chances de ser lido. A contratação depende também da sua entrevista, mas nós te colocamos na frente dos recrutadores.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Com certeza. O plano Pro pode ser cancelado a qualquer momento e você continua com acesso até o fim do ciclo de cobrança.",
    },
    {
      question: "Minhas informações estão seguras?",
      answer:
        "Absolutamente. Levamos a proteção de dados a sério e seguimos rigorosamente a LGPD. Não vendemos seus dados.",
    },
  ];

  return (
    <SectionContainer className="bg-background max-w-4xl mx-auto" id="faq">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Perguntas Frequentes
        </h2>
        <p className="text-lg text-muted-foreground">
          Tire suas dúvidas e comece hoje mesmo.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionContainer>
  );
}
