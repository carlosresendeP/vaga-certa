import { GoogleGenAI } from "@google/genai";

interface GeneratedResume {
  name: string;
  markdownContent: string;
}

export const generateTailoredResume = async (
  resumeText: string,
  jobDescription: string,
): Promise<GeneratedResume> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key configuration missing for Gemini.");
  }

  const genAI = new GoogleGenAI({ apiKey });

const prompt = `
Você é um especialista sênior em carreira, recrutamento e ATS (Applicant Tracking System).
Sua tarefa é REESCREVER um currículo existente, adaptando-o com precisão para uma vaga específica.
SEJA humano e use palavras claras e objetivas. Não seja genérico como 'escaláveis, performáticos, background sólido, etc'

═══════════════════════════════════════════════════════════════════════════════
REGRAS OBRIGATÓRIAS DO RESUMO DE QUALIFICAÇÕES
═══════════════════════════════════════════════════════════════════════════════

FORMATO DO RESUMO:
- UM ÚNICO PARÁGRAFO CORRIDO (SEM bullet points, SEM quebras de linha)
- Máximo absoluto: 12 linhas
- Seja OBJETIVO e DIRETO
- Foque apenas no essencial: experiência + tecnologias + alinhamento com a vaga

ESTRUTURA DO PARÁGRAFO ÚNICO:
Inicie com área de atuação/transição, mencione as principais tecnologias que domina alinhadas à vaga, destaque experiência prática relevante (projetos, bootcamps ou trabalhos anteriores) e finalize com metodologias/ferramentas que conectam com os requisitos da posição.

NÃO USE clichês como:
- "background sólido"
- "soluções escaláveis"
- "sistemas robustos"
- "visão estratégica"

USE palavras específicas e objetivas.

═══════════════════════════════════════════════════════════════════════════════
OUTRAS REGRAS OBRIGATÓRIAS
═══════════════════════════════════════════════════════════════════════════════

- O currículo completo deve ter no máximo 2 páginas
- NÃO invente informações, experiências, cargos, empresas, cursos ou datas
- Utilize APENAS informações explícitas no currículo original
- Reorganize, reescreva e destaque conteúdos, mas mantenha tudo verdadeiro
- Dê prioridade às experiências, habilidades e palavras-chave da vaga
- Use linguagem profissional, clara e objetiva
- O resultado FINAL deve estar em Markdown limpo, pronto para conversão em PDF
- Não adicione comentários, explicações ou textos fora do currículo

═══════════════════════════════════════════════════════════════════════════════
DADOS DE ENTRADA
═══════════════════════════════════════════════════════════════════════════════

CURRÍCULO ORIGINAL (texto bruto):
${resumeText}

────────────────────────────────────────────────────────────────────────────────

DESCRIÇÃO DA VAGA:
${jobDescription}

═══════════════════════════════════════════════════════════════════════════════
ESTRUTURA EXATA DO CURRÍCULO (NÃO ALTERE A ORDEM)
═══════════════════════════════════════════════════════════════════════════════

# NOME E SOBRENOME

**Nacionalidade / PcD**  
Bairro, Cidade e Estado | Celular: (DDD) 9 9999-9999  
E-mail: seuemail@seuemail.com | LinkedIn: www.linkedin.com/in/seunomeesobrenome  
Portfólio: [Link se houver]

**[NOME DA VAGA DE INTERESSE]**

## Resumo de Qualificações

[UM ÚNICO PARÁGRAFO corrido, máximo 12 linhas, objetivo e direto, conectando experiência anterior + stack técnica + fit com a vaga]

## Formação Acadêmica

[Curso] - [Instituição], [Ano]

## Idiomas

[Idioma] – [Nível]

## Histórico Profissional

[Mês/Ano Início] a [Mês/Ano Fim] – [Nome da Empresa]  
[Cargo]  
[Atividades e responsabilidades mais relevantes para a vaga]
[Resultados mensuráveis ou impactos práticos, se existirem]

(Liste APENAS as 3 experiências mais relevantes para a vaga)

## Experiência Internacional

[Liste somente se houver informação no currículo original]

## Formação Complementar

[Cursos, certificações ou treinamentos relevantes]

## Projetos

[Nome do Projeto]: [Tecnologias utilizadas]. [Breve descrição objetiva]. Link: [Link se houver]

## Ferramentas da Tecnologia e Outras Informações

[Ferramentas, tecnologias e metodologias]
[Outras informações profissionais relevantes]

═══════════════════════════════════════════════════════════════════════════════
LEMBRETE FINAL
═══════════════════════════════════════════════════════════════════════════════

- Use palavras-chave da vaga sempre que fizer sentido
- Priorize clareza, escaneabilidade e compatibilidade com ATS
- O conteúdo final deve parecer escrito por um recrutador experiente
- CRÍTICO: O Resumo de Qualificações é UM PARÁGRAFO SÓ, máximo 12 linhas
- Retorne APENAS o currículo em Markdown, sem comentários extras

Agora gere o currículo otimizado:
`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview", // Reverting to known working model
      contents: prompt,
      config: {
        responseMimeType: "text/plain",
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Failed to generate resume content.");
    }

    return {
      name: "Currículo Otimizado",
      markdownContent: text,
    };
  } catch (error) {
    console.error("Gemini Scan Error:", error);
    throw new Error("Failed to analyze resume with AI.");
  }
};
