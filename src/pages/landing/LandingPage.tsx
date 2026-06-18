import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { LandingFooter } from "./components/LandingFooter";

export const LandingPage = () => {
  return (
    <div className="-m-4 min-h-[calc(100vh-4rem)] bg-slate-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
      <LandingFooter />
    </div>
  );
};
