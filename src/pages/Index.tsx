import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Benefits from "@/components/site/Benefits";
import Lifestyle from "@/components/site/Lifestyle";
import Package from "@/components/site/Package";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "OuraEyes — SiaaSoo Smart Eye Massager";
    const desc = "Melt away eye strain and sleep deeper with SiaaSoo — the smart eye massager from OuraEyes. Heat, vibration & sound therapy in one elegant device.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <Lifestyle />
      <Package />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
