import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How often should I use SiaaSoo?", a: "We recommend a 15-minute session, 1–2 times daily — perfect before bed or after long screen sessions." },
  { q: "Is it safe for sensitive eyes?", a: "Yes. SiaaSoo uses gentle far-infrared heat and air-pressure massage, certified safe for daily use. It's not recommended for users with recent eye surgery." },
  { q: "How long does the battery last?", a: "Up to 120 minutes per charge. Full recharge takes around 2 hours via the included USB-C cable." },
  { q: "Can I connect my own music?", a: "Absolutely. SiaaSoo connects via Bluetooth so you can stream Spotify, podcasts, or your own meditation tracks." },
  { q: "What's your return policy?", a: "Try it risk-free for 60 nights. If it's not for you, we'll refund you in full — no questions asked." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-deep leading-tight">
            Questions, <span className="italic text-primary">answered</span>.
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border/60 rounded-2xl px-6 bg-gradient-card shadow-soft"
            >
              <AccordionTrigger className="text-left font-serif text-lg text-primary-deep hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
