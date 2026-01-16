import {
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaSpotify,
  FaUber,
} from "react-icons/fa";
import { PageContainer, SectionContainer } from "@/components/ui/page";

export default function SocialProof() {
  return (
    <PageContainer className="border-y border-border/50 bg-secondary/30">
      <SectionContainer className="py-10 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Junte-se a profissionais contratados por
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <FaGoogle className="h-8 w-auto hover:text-[#4285F4] transition-colors" />
          <FaMicrosoft className="h-8 w-auto hover:text-[#00A4EF] transition-colors" />
          <FaSpotify className="h-8 w-auto hover:text-[#1DB954] transition-colors" />
          <FaAmazon className="h-8 w-auto hover:text-[#FF9900] transition-colors" />
          <FaUber className="h-8 w-auto hover:text-black transition-colors" />
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
