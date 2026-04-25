import boxContents from "@/assets/box-contents.png";

const Package = () => {
  return (
    <section id="package" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Unboxing</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-deep leading-tight">
            Everything you need, <span className="italic text-primary">beautifully packed</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Each SiaaSoo arrives in our signature sage gift box — ready to give, ready to glow.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-card border border-border/60 shadow-elegant p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
          <img
            src={boxContents}
            alt="OuraEyes SiaaSoo box contents — premium packaging, product unit, envelope, manual, quick start guide and charging cable"
            loading="lazy"
            className="relative w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Package;
