# 🚀 Vaga Certa

**Vaga Certa** é uma plataforma de otimização de currículos impulsionada por IA, projetada para ajudar candidatos a se destacarem no mercado de trabalho. Utilizando o poder da **Google Gemini AI**, a aplicação analisa currículos em PDF em relação a descrições de vagas específicas, fornecendo feedbacks acionáveis e gerando versões otimizadas para aumentar as chances de conseguir uma entrevista.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna e focada em performance:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (via Supabase) com [Prisma ORM](https://www.prisma.io/)
- **Autenticação:** [Better-Auth](https://www.better-auth.com/)
- **Modelo de IA:** [Google Gemini 1.5](https://deepmind.google/technologies/gemini/)
- **Processamento de PDF:** `pdf-parse`



## Imagens do projeto

# Landing Page
<div style="display: flex; justify-content: center;">
    <img src="/public/Images-readme/l1.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l2.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l3.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l4.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l5.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l6.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l7.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l8.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l9.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l10.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/l11.png" width="200px" alt="Imagens do projeto">
</div>

# Dashboard
<div style="display: flex; justify-content: center;">
    <img src="/public/Images-readme/d1.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/d2.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/d3.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/d4.png" width="200px" alt="Imagens do projeto">
    <img src="/public/Images-readme/d5.png" width="200px" alt="Imagens do projeto">
</div>



## 📐 Arquitetura e Fluxo

O diagrama abaixo ilustra o fluxo principal do usuário dentro da aplicação Vaga Certa:

```mermaid
graph TD
    A[Landing Page] -->|Login/Cadastro| B(Autenticação)
    B --> C[Dashboard do Usuário]

    subgraph "Processo de Otimização de Currículo"
        C -->|Upload de PDF| D[Processador de Currículo]
        D -->|Extração de Texto| E[Motor de Análise de IA]
        C -->|Inserir Descrição da Vaga| E
        E -->|Engenharia de Prompt| F[API Gemini]
        F -->|Sugestões de Otimização| G[Visualização de Resultados]
        G -->|Salvar Histórico| H[(Banco de Dados)]
    end

    subgraph "Gerenciamento de Assinatura"
        C -->|Verificar Limites| I{Status do Plano}
        I -->|Grátis| J[Limite: 2/mês]
        I -->|Pro| K[Limite: 20/mês]
    end
```

## 📖 Como Usar

Siga este passo a passo para otimizar seu currículo:

1.  **Acesse a Dashboard**: Após fazer login, você será redirecionado para a área principal.
2.  **Inicie uma Nova Análise**: Clique no botão para criar uma nova otimização.
3.  **Upload do Currículo**:
    - Arraste e solte ou selecione seu arquivo de currículo (formato PDF).
    - O sistema extrairá automaticamente o texto do seu documento.
4.  **Descrição da Vaga**:
    - Cole a descrição completa da vaga para a qual deseja se candidatar.
    - Quanto mais detalhes sobre a vaga, melhor será a análise da IA.
5.  **Analisar**: Clique no botão de processamento. A IA irá:
    - Comparar seu perfil com os requisitos da vaga.
    - Identificar pontos fortes e lacunas.
    - Gerar um score de compatibilidade.
6.  **Resultados**:
    - Receba um feedback detalhado sobre o que melhorar.
    - Visualize uma versão sugerida do seu currículo, otimizada para a vaga específica.
    - Baixe ou copie as sugestões para aplicar no seu documento original.

## 🚀 Começando

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (v18+ recomendado)
- **npm** ou **pnpm**
- Um banco de dados **PostgreSQL** (local ou hospedado via Supabase/Neon)
- Uma conta no **Google Cloud Console** (para chave da API Gemini)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/carlosresendeP/vaga-certa.git
    cd vaga-certa
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com base no `.env.example`:

    ```env
    # Banco de Dados
    DATABASE_URL="postgresql://usuario:senha@host:porta/db"

    # Better-Auth (Autenticação)
    BETTER_AUTH_URL="http://localhost:3000"
    BETTER_AUTH_SECRET="seu-segredo-gerado"

    # Provedores OAuth (Google)
    GOOGLE_CLIENT_ID="seu-google-client-id"
    GOOGLE_CLIENT_SECRET="seu-google-client-secret"

    # Serviço de IA
    GEMINI_API_KEY="sua-chave-api-gemini"

    # Pagamentos (Kiwify)
    KIWIFY_WEBHOOK_TOKEN_PRO="seu-token-kiwify"
    NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PRO="seu-url-checkout"
    ```

4.  **Configuração do Banco de Dados:**
    Envie o schema para o seu banco:

    ```bash
    npx prisma db push
    # ou
    npx prisma migrate dev
    ```

5.  **Rode a aplicação:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) para ver o app.

## 💾 Visão Geral do Banco de Dados

Principais modelos em `prisma/schema.prisma`:

- **User**: Dados principais do usuário e relações.
- **Plan**: Enum (`FREE`, `PRO`) definindo o nível de assinatura.
- **UserUsage**: Rastreia o uso mensal (uploads/análises) para aplicar limites do plano.
- **ResumeHistory**: Armazena o texto original, descrição da vaga e resultados gerados.
- **Session/Account**: Gerencia sessões e conexões com provedores (Better-Auth).

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
