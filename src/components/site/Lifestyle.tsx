import { Check } from "lucide-react";
import lifestyle from "@/assets/lifestyle-model.png";

const points = [
  "Premium memory-foam comfort fit",
  "Bluetooth audio with curated soundscapes",
  "Adjustable heat from 38°C to 42°C",
  "Up to 120 minutes wireless battery life",
];

const Lifestyle = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-secondary/40">
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 bg-gradient-sage opacity-10 rounded-[2rem] blur-2xl" />
          <img
            src={lifestyle}
            alt="Woman wearing the OuraEyes SiaaSoo smart eye massager"
            loading="lazy"
            className="relative w-full rounded-[2rem] shadow-elegant"
          />
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Designed for you</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-deep leading-tight">
            Spa-grade therapy, <span className="italic text-primary">in your hands</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Crafted from soft-touch materials and precision engineering, SiaaSoo combines warmth, gentle vibration, and immersive sound — all in a foldable, travel-ready design.
          </p>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                </span>
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
