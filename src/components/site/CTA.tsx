import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-sage p-12 md:p-20 text-center shadow-elegant">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 30%, hsl(40 33% 97% / 0.3), transparent 60%)" }} />
          <div className="relative max-w-2xl mx-auto space-y-8 text-primary-foreground">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              Give your eyes the<br /><span className="italic">rest they deserve.</span>
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Join thousands who've made SiaaSoo part of their daily wellness ritual.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link to="/checkout">
                <Button size="xl" className="bg-background text-primary-deep hover:bg-background/90 rounded-full shadow-elegant">
                  Order SiaaSoo — €299.99
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm opacity-75">Free shipping · 60-night trial · 2-year warranty</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
