import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, MessageCircle, Clock, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { company, formattedAddress } from "@/lib/company";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${company.name}` },
      { name: "description", content: `Talk to ${company.name}. Office in Hyderabad. Email ${company.email}, WhatsApp ${company.whatsapp}.` },
      { property: "og:title", content: `Contact — ${company.name}` },
      { property: "og:description", content: "Reach our team for a tailored proposal." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-sm uppercase tracking-wider text-white/70">Contact</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">Let's talk.</h1>
          <p className="mt-6 max-w-2xl text-white/75 text-lg">We respond within one business day. For urgent inquiries, WhatsApp is fastest.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold">Business inquiries</h2>
            <p className="mt-1 text-sm text-muted-foreground">Share a few details — we'll reply with next steps.</p>
            <form
              className="mt-6 grid gap-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const data = Object.fromEntries(fd.entries());
                const parsed = schema.safeParse(data);
                if (!parsed.success) {
                  toast.error(parsed.error.issues[0].message);
                  return;
                }
                setLoading(true);
                // Compose mailto fallback so message reliably reaches support
                const subject = encodeURIComponent(`New inquiry from ${parsed.data.name}`);
                const body = encodeURIComponent(`Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nCompany: ${parsed.data.company ?? ""}\n\n${parsed.data.message}`);
                window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
                setTimeout(() => {
                  toast.success("Opening your email client…");
                  setLoading(false);
                }, 400);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company (optional)</Label>
                <Input id="company" name="company" maxLength={120} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" rows={6} required maxLength={2000} className="mt-1.5" />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="bg-[image:var(--gradient-brand)] text-white hover:opacity-95 shadow-glow w-fit">
                {loading ? "Sending…" : "Send message"}
              </Button>
            </form>
          </Card>

          <Card className="mt-6 p-0 overflow-hidden">
            <div className="aspect-[16/8] w-full bg-[image:var(--gradient-soft)] grid place-items-center text-muted-foreground">
              <iframe
                title="Office location"
                src="https://www.google.com/maps?q=Telecom+Nagar+Gachibowli+Hyderabad&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-sm text-muted-foreground mt-1">{formattedAddress}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a className="text-sm text-muted-foreground hover:text-primary" href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <a className="text-sm text-muted-foreground hover:text-primary" href={`https://wa.me/${company.whatsappRaw}`}>{company.whatsapp}</a>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Office hours</h3>
                <p className="text-sm text-muted-foreground mt-1">{company.hours}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Follow us</h3>
            <div className="mt-3 flex gap-2">
              <a aria-label="LinkedIn" href={company.social.linkedin} className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition"><Linkedin className="h-4 w-4" /></a>
              <a aria-label="Twitter" href={company.social.twitter} className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition"><Twitter className="h-4 w-4" /></a>
              <a aria-label="GitHub" href={company.social.github} className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition"><Github className="h-4 w-4" /></a>
              <a aria-label="Instagram" href={company.social.instagram} className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition"><Instagram className="h-4 w-4" /></a>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
