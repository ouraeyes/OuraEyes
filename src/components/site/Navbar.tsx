import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-sage flex items-center justify-center shadow-soft">
            <Eye className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight">OuraEyes</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-smooth">Features</a>
          <a href="#benefits" className="hover:text-foreground transition-smooth">Benefits</a>
          <a href="#package" className="hover:text-foreground transition-smooth">What's Inside</a>
          <a href="#faq" className="hover:text-foreground transition-smooth">FAQ</a>
        </nav>
        <Link to="/checkout"><Button variant="sage" size="sm">Shop SiaaSoo</Button></Link>
      </div>
    </header>
  );
};

export default Navbar;
