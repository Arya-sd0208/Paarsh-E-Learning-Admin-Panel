import Link from "next/link";
import { Logo } from "./Logo";
import { Twitter, Facebook, Linkedin ,Instagram , Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LEFT: Logo + Description */}
          <div className="md:col-span-1">
            <div className="mb-5">
              {/* Logo slightly bigger */}
              <div className="scale-110 origin-left">
                <Logo />
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground max-w-sm">
              Education is door for future & Paarsh E-Learning is the key for
              bright your future.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              <a
                href="https://x.com/EPaarsh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.facebook.com/paarsh.elearning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/paarsh-e-learning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
               <a
                href="https://www.instagram.com/paarsh_elearning/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
               <a
                href="https://www.youtube.com/@PaarshE-learning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/courses" className="hover:text-foreground">Courses</Link></li>
              <li><Link href="/about-us" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/workshops" className="hover:text-foreground">Workshops</Link></li>
              <li><Link href="/contact-us" className="hover:text-foreground">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
<li>
      <a
        href="tel:+919075201035"
        className="flex items-center gap-2 hover:text-primary"
      >
        📞 <span>+91 90752 01035</span>
      </a>
    </li>
 <li>
      <a
        href="tel:+919860098343"
        className="flex items-center gap-2 hover:text-primary"
      >
        📞 <span>+91 98600 98343</span>
      </a>
    </li>              <li>🕘 10:00 AM – 06:00 PM</li>
              <li>✉ info@paarshelearning.com</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Paarsh E-Learning. All rights reserved.</p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/terms-and-conditions" className="hover:text-foreground">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/return-policy" className="hover:text-foreground">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}