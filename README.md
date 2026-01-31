# 🚀 Vaga Certa

**Vaga Certa** is an AI-powered resume optimization platform designed to help job seekers stand out. By leveraging the power of **Google Gemini AI**, the application analyzes uploaded resumes against specific job descriptions, providing actionable feedback and generating optimized versions to increase the chances of landing an interview.

## 🛠️ Tech Stack

This project is built with a modern, performance-focused stack:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via Supabase) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Better-Auth](https://www.better-auth.com/)
- **AI Model:** [Google Gemini 1.5](https://deepmind.google/technologies/gemini/)
- **PDF Parsing:** `pdf-parse`

## 📐 Architecture & Flow

The following diagram illustrates the core user flow within the Vaga Certa application:

```mermaid
graph TD
    A[Landing Page] -->|Login/Register| B(Authentication)
    B --> C[User Dashboard]

    subgraph "Resume Optimization Process"
        C -->|Upload PDF| D[Resume Parser]
        D -->|Text Extraction| E[AI Analysis Engine]
        C -->|Input Job Desc| E
        E -->|Prompt Engineering| F[Gemini API]
        F -->|Optimization Suggestions| G[Results View]
        G -->|Save History| H[(Database)]
    end

    subgraph "Subscription Management"
        C -->|Check Limits| I{Plan Status}
        I -->|Free| J[Limit: 2/month]
        I -->|Pro| K[Limit: 20/month]
    end
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **pnpm**
- A **PostgreSQL** database (locally or hosted via Supabase/Neon)
- A **Google Cloud Console** account (for Gemini API key)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/carlosresendeP/vaga-certa.git
    cd vaga-certa
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and populate it based on `.env.example`:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@host:port/db"

    # Better-Auth (Authentication)
    BETTER_AUTH_URL="http://localhost:3000"
    BETTER_AUTH_SECRET="your-generated-secret"

    # OAuth Providers (Google)
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"

    # AI Service
    GEMINI_API_KEY="your-gemini-api-key"

    # Payments (Kiwify)
    KIWIFY_WEBHOOK_TOKEN_PRO="your-kiwify-token"
    NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PRO="your-checkout-url"
    ```

4.  **Database Setup:**
    Push the schema to your database:

    ```bash
    npx prisma db push
    # or
    npx prisma migrate dev
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 💾 Database Schema Overview

Key models in `prisma/schema.prisma`:

- **User**: Core user data and relationship to other models.
- **Plan**: Enum (`FREE`, `PRO`) defining user subscription tier.
- **UserUsage**: Tracks monthly usage (resume uploads/analyses) to enforce plan limits.
- **ResumeHistory**: Stores original text, job descriptions, and generated results for user history.
- **Session/Account**: Manages authentication states and provider links (Better-Auth).

## 📝 License

This project is licensed under the MIT License.
