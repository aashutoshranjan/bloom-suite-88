import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { company, formattedAddress } from "@/lib/company";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-hero)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 backdrop-blur font-bold">A</span>
            <span className="font-display text-xl font-semibold">{company.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/70">{company.description}</p>
          <div className="mt-6 flex gap-3">
            <a aria-label="LinkedIn" href={company.social.linkedin} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"><Linkedin className="h-4 w-4" /></a>
            <a aria-label="Twitter" href={company.social.twitter} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"><Twitter className="h-4 w-4" /></a>
            <a aria-label="GitHub" href={company.social.github} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"><Github className="h-4 w-4" /></a>
            <a aria-label="Instagram" href={company.social.instagram} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>{formattedAddress}</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href={`https://wa.me/${company.whatsappRaw}`} className="hover:text-white">{company.whatsapp}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>{company.domain}</p>
        </div>
      </div>
    </footer>
  );
}
