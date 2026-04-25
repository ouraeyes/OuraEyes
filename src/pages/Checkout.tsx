import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ShieldCheck, Truck, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroProduct from "@/assets/hero-product.png";

const UNIT_PRICE = 299.99;

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
    country: "Belgium",
    notes: "",
  });

  useEffect(() => {
    document.title = "Checkout — OuraEyes SiaaSoo (€299.99)";
  }, []);

  const total = (UNIT_PRICE * quantity).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: { ...form, quantity },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      navigate(`/order-confirmation?ref=${data.order_ref}&total=${data.total_eur}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="container max-w-6xl py-10 md:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to store
        </Link>

        <div className="grid lg:grid-cols-[1fr,420px] gap-10">
          {/* Form */}
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-primary-deep mb-2">Checkout</h1>
            <p className="text-muted-foreground mb-8">Complete your order — secure bank transfer in EUR.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/60">
                <h2 className="font-serif text-xl text-primary-deep mb-5">Contact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" name="full_name" value={form.full_name} onChange={handleChange} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required className="sm:col-span-2" />
                </div>
              </section>

              <section className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/60">
                <h2 className="font-serif text-xl text-primary-deep mb-5">Shipping address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Address line 1" name="address_line1" value={form.address_line1} onChange={handleChange} required className="sm:col-span-2" />
                  <Field label="Address line 2 (optional)" name="address_line2" value={form.address_line2} onChange={handleChange} className="sm:col-span-2" />
                  <Field label="Postal code" name="postal_code" value={form.postal_code} onChange={handleChange} required />
                  <Field label="City" name="city" value={form.city} onChange={handleChange} required />
                  <Field label="Country" name="country" value={form.country} onChange={handleChange} required className="sm:col-span-2" />
                </div>
              </section>

              <section className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/60">
                <h2 className="font-serif text-xl text-primary-deep mb-5">Order notes (optional)</h2>
                <Label htmlFor="notes" className="sr-only">Notes</Label>
                <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} rows={3} maxLength={1000} placeholder="Anything we should know about your delivery?" />
              </section>

              <Button type="submit" variant="hero" size="xl" disabled={loading} className="w-full">
                {loading ? "Placing order..." : `Place order — €${total}`}
              </Button>

              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                <Lock className="h-3 w-3" /> Your information is encrypted and never shared. Payment via bank transfer in EUR.
              </p>
            </form>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border/60">
              <h2 className="font-serif text-xl text-primary-deep mb-6">Order summary</h2>

              <div className="flex gap-4 pb-6 border-b border-border/60">
                <div className="h-20 w-20 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <img src={heroProduct} alt="SiaaSoo" className="h-16 w-16 object-contain" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">OuraEyes SiaaSoo</p>
                  <p className="text-sm text-muted-foreground">Smart Eye Massager</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-7 w-7 rounded-md border border-border hover:bg-accent">−</button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} className="h-7 w-7 rounded-md border border-border hover:bg-accent">+</button>
                  </div>
                </div>
                <p className="font-medium">€{(UNIT_PRICE * quantity).toFixed(2)}</p>
              </div>

              <div className="space-y-2 py-6 border-b border-border/60 text-sm">
                <Row label="Subtotal" value={`€${total}`} />
                <Row label="Shipping" value="Free" />
              </div>
              <div className="flex justify-between pt-6 text-lg font-medium">
                <span>Total (EUR)</span>
                <span className="text-primary-deep">€{total}</span>
              </div>

              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> Free EU shipping</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> 60-day returns · 2-year warranty</li>
                <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Secure bank transfer (EUR only)</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const Field = ({ label, name, className, ...rest }: any) => (
  <div className={className}>
    <Label htmlFor={name} className="text-sm mb-1.5 block">{label}</Label>
    <Input id={name} name={name} maxLength={255} {...rest} />
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{label}</span><span>{value}</span></div>
);

export default Checkout;
