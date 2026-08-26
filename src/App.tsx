import { useEffect } from "react";
import { Scene } from "@/three/Scene";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { WhatsInside } from "@/components/sections/WhatsInside";
import { Transformation } from "@/components/sections/Transformation";
import { BlueprintShowcase } from "@/components/sections/BlueprintShowcase";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BrandClosing } from "@/components/sections/BrandClosing";
import { initAnalytics, trackEvent } from "@/integrations/analytics/analytics";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";

export default function App() {
  useScrollDepthTracking();

  useEffect(() => {
    initAnalytics();
    trackEvent("page_view");
  }, []);

  return (
    <>
      <Scene />
      <Header />
      <main>
        <Hero />
        <Problem />
        <WhatsInside />
        <Transformation />
        <BlueprintShowcase />
        <EmailCapture />
        <BrandClosing />
      </main>
      <Footer />
    </>
  );
}
