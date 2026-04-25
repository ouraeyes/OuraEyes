import { Eye } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-12 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-full bg-gradient-sage flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
              </div>
              <span className="font-serif text-xl font-semibold">OuraEyes</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Smart wellness devices designed to help you slow down, breathe deeper, and live brighter.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">SiaaSoo</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Accessories</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#faq" className="hover:text-foreground transition-smooth">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/60 flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OuraEyes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
            <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
