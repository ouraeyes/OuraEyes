import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Copy } from "lucide-react";
import { toast } from "sonner";

const IBAN = "BE30 7340 6587 2911";
const BANK = "KBC";
const BENEFICIARY = "OuraEyes";

const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const orderRef = params.get("ref") || "—";
  const total = params.get("total") || "0.00";

  useEffect(() => {
    document.title = `Order ${orderRef} confirmed — OuraEyes`;
  }, [orderRef]);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl py-16 md:py-24">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant border border-border/60 text-center">
          <div className="h-16 w-16 rounded-full bg-primary-soft flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary-deep" strokeWidth={2} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-primary-deep mb-2">Thank you!</h1>
          <p className="text-muted-foreground mb-8">
            Your order <strong className="text-foreground">{orderRef}</strong> has been received. Please complete the bank transfer below to finalize your purchase.
          </p>

          <div className="bg-gradient-hero rounded-2xl p-6 text-left space-y-4 mb-8 border border-border/40">
            <h2 className="font-serif text-lg text-primary-deep mb-2">Payment instructions</h2>
            <Detail label="Amount" value={`€${total} EUR`} onCopy={() => copy(total, "Amount")} />
            <Detail label="Beneficiary" value={BENEFICIARY} />
            <Detail label="Bank" value={BANK} />
            <Detail label="IBAN" value={IBAN} mono onCopy={() => copy(IBAN.replace(/\s/g, ""), "IBAN")} />
            <Detail label="Reference" value={orderRef} mono highlight onCopy={() => copy(orderRef, "Reference")} />
          </div>

          <div className="bg-primary-soft/40 rounded-xl p-4 text-sm text-primary-deep mb-8 flex items-start gap-3 text-left">
            <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              We've also emailed you these payment details. Make sure to include reference <strong>{orderRef}</strong> in your transfer so we can match your payment. We ship within 24h of receiving payment.
            </p>
          </div>

          <Link to="/">
            <Button variant="soft" size="lg">Back to home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

const Detail = ({ label, value, mono, highlight, onCopy }: { label: string; value: string; mono?: boolean; highlight?: boolean; onCopy?: () => void }) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`${mono ? "font-mono" : ""} ${highlight ? "text-primary-deep font-semibold" : ""} text-sm md:text-base`}>{value}</span>
      {onCopy && (
        <button onClick={onCopy} className="p-1.5 rounded-md hover:bg-accent transition-smooth" aria-label={`Copy ${label}`}>
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  </div>
);

export default OrderConfirmation;
