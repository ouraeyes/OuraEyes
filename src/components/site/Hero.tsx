import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft/60 px-4 py-1.5 text-xs font-medium text-primary-deep">
            <Star className="h-3.5 w-3.5 fill-current" />
            Trusted by 50,000+ users worldwide
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-primary-deep">
            Calm your eyes.<br />
            <span className="italic text-primary">Quiet your mind.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Meet <strong className="text-foreground font-medium">SiaaSoo</strong> — the smart eye massager that melts away tension, soothes tired eyes, and helps you drift into deeper sleep with heat, vibration & sound therapy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl">
              Order Now — €149
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="soft" size="xl">Watch Demo</Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-medium text-foreground">4.9/5</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span>Free shipping · 60-day returns</span>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-0 bg-gradient-sage opacity-20 blur-3xl rounded-full animate-pulse-glow" />
          <img
            src={heroProduct}
            alt="OuraEyes SiaaSoo smart eye massager floating on cream background"
            width={1024}
            height={1024}
            className="relative w-full max-w-xl mx-auto animate-float drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
