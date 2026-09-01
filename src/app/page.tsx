import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Ticker from "@/components/sections/Ticker";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Orbit from "@/components/sections/Orbit";
import Pricing from "@/components/sections/Pricing";
import Reach from "@/components/sections/Reach";
import Faq from "@/components/sections/Faq";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Brands />
        <Manifesto />
        <About />
        <Ticker />
        <Orbit />
        <Pricing />
        <Faq />
        <Reach />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
