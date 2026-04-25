import { Moon, Eye, Brain, Heart, Sparkles, Waves } from "lucide-react";

const benefits = [
  { icon: Eye, title: "Relieves Eye Strain", desc: "Targeted compression points soothe tired muscles after long screen time." },
  { icon: Moon, title: "Better Sleep", desc: "Calming heat & sound guide your body into deeper, more restful sleep." },
  { icon: Brain, title: "Reduces Stress", desc: "Activates your parasympathetic system in just 15 minutes a day." },
  { icon: Heart, title: "Eases Headaches", desc: "Gentle pressure on key acupoints helps relieve tension migraines." },
  { icon: Sparkles, title: "Smooths Fine Lines", desc: "Improves circulation around the eye area for a brighter look." },
  { icon: Waves, title: "5 Smart Modes", desc: "Choose from sleep, focus, relax, beauty or custom presets." },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Wellness, redefined</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-deep leading-tight">
            Your daily ritual for <span className="italic text-primary">restored eyes</span>.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group p-8 rounded-3xl bg-gradient-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary-soft flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                <b.icon className="h-6 w-6 text-primary-deep group-hover:text-primary-foreground transition-smooth" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-xl text-primary-deep mb-2">{b.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
