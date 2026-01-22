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
    SEJA humano e palavras claras e objetivas. Não seja generico como 'escalaveis, performaticos,background solido, etc'

    REGRAS OBRIGATÓRIAS:
    - O resumo de qualificações deve ter no máximo 4 linhas e no maximo 4 parágrafos no minimo. Minimo de 3 linhas por parágrafo. 
    - No resumo de qualificações não utilize bullet points, utilize apenas parágrafos. NUNCA Passe de 14 linhas. no minimo 10 linhas.
    - O currículo deve ter no máximo 2 páginas.
    - NÃO invente informações, experiências, cargos, empresas, cursos ou datas.
    - Utilize APENAS informações que estejam explícitas no currículo original.
    - Reorganize, reescreva e destaque conteúdos, mas mantenha tudo verdadeiro.
    - Dê prioridade às experiências, habilidades e palavras-chave presentes na descrição da vaga.
    - Use linguagem profissional, clara e objetiva.
    - O resultado FINAL deve estar em Markdown limpo, pronto para conversão em PDF.
    - Não adicione comentários, explicações ou textos fora do currículo.
    - UTILIZE o modelo de resumo abaixo para gerar o resumo de qualificações. NÃO FAÇA IGUAL AO MODELO, APENAS USE COMO BASE E MUITO MENOS FORMAL.
    modelo de resumo de qualificações:
    Profissional da área de programação, com background sólido em [área anterior, ex.: engenharia, administração, marketing]. Experiência prévia em [habilidades transferíveis, ex.: análise de dados, automação de processos, lógica de negócios], agregando uma visão estratégica ao desenvolvimento de software. 

    Habilidade em desenvolvimento de sistemas utilizando [tecnologias principais, ex.: JavaScript, React, Node.js, Python], com foco na criação de soluções escaláveis e eficientes. Experiência prática adquirida por meio de projetos próprios, cursos e bootcamps intensivos em programação. 

    Capacidade de aprendizado rápido e adaptação a novos desafios, com conhecimento em metodologias ágeis (Scrum, Kanban), versionamento de código (Git) e integração de APIs. Experiência com banco de dados [SQL/NoSQL] e implementação de arquiteturas eficientes para garantir a escalabilidade das soluções. 

    otivado a ingressar no mercado de tecnologia, trazendo habilidades analíticas, pensamento crítico e experiência multidisciplinar para agregar valor ao desenvolvimento de produtos digitais. Busco oportunidades para colaborar com equipes inovadoras e continuar minha evolução profissional na área de tecnologia. 

    ────────────────────────────
    CURRÍCULO ORIGINAL (texto bruto):
    "${resumeText}"
    ────────────────────────────
    DESCRIÇÃO DA VAGA:
    "${jobDescription}"
    ────────────────────────────

    Agora, gere um NOVO currículo, TOTALMENTE ADAPTADO para a vaga, seguindo RIGOROSAMENTE o modelo abaixo.
    NÃO altere títulos, ordem das seções ou estrutura.

    MODELO DE CURRÍCULO (Siga exatamente esta estrutura):

    # NOME E SOBRENOME
    **Nacionalidade / Pcd**
    Bairro, Cidade e Estado | Celular: (DDD) 9 9999-9999  
    E-mail: seuemail@seuemail.com | LinkedIn: www.linkedin.com/in/seunomeesobrenome  
    Portfólio: [Link se houver]

    **[NOME DA VAGA DE INTERESSE]**

    ## Resumo de Qualificações
    [Destaque 1 diretamente relacionado à vaga]
    [Destaque 2 diretamente relacionado à vaga]
    [Destaque 3 diretamente relacionado à vaga]
    [Destaque 4 diretamente relacionado à vaga]

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

    IMPORTANTE:
    - Use palavras-chave da vaga sempre que fizer sentido.
    - Priorize clareza, escaneabilidade e compatibilidade com ATS.
    - O conteúdo final deve parecer escrito por um recrutador experiente.
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
