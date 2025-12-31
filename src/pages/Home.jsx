import HeroSection from "../sections/HeroSection";
import BenefitsSection from "../sections/BenefitsSection";
import FeaturedProducts from "../sections/FeaturedProducts";
import HowItWorks from "../sections/HowItWorks";
import CallToAction from "../sections/CallToAction";

export default function Home() {
  return (
    <div className="container">
      <HeroSection />
      <BenefitsSection />
      <FeaturedProducts />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}
