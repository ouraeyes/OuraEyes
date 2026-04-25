import { Star } from "lucide-react";

const reviews = [
  { name: "Emma L.", role: "Designer, Amsterdam", quote: "I use SiaaSoo every night before bed. My migraines have nearly disappeared and I sleep so much deeper." },
  { name: "Marco T.", role: "Software Engineer", quote: "After 10 hours of screen time, this is pure heaven. The heat function is unreal." },
  { name: "Sofia K.", role: "Yoga Instructor", quote: "It feels like a mini spa session. I gifted three to my family already." },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-primary-deep text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 20%, hsl(95 30% 50% / 0.4), transparent 50%)" }} />
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary-soft uppercase tracking-widest mb-4">Loved worldwide</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            Real stories from <span className="italic">real people</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="p-8 rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-soft text-primary-soft" />
                ))}
              </div>
              <p className="font-serif text-lg leading-relaxed mb-6 italic">"{r.quote}"</p>
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-primary-foreground/60">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
