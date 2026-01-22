import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorks from "@/components/landing/HowItWorks";
import BenefitsSection from "@/components/landing/BenefitsSection";
// import TestimonialSection from "@/components/landing/TestimonialSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Header />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <HowItWorks />
      {/* <TestimonialSection /> */}
      <FeaturesGrid />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
