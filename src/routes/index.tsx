import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Shield, Zap, Globe, Code2, Cpu, Cloud, Smartphone, Layers, Database, Bot, ShieldCheck, Workflow, GraduationCap, ShoppingCart, HeartPulse, Building2, Factory, BarChart3, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hero from "@/assets/hero.jpg";
import { company } from "@/lib/company";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${company.name} — ${company.tagline}` },
      { name: "description", content: "Enterprise software, AI, cloud, and digital transformation by AxonCore Technologies." },
      { property: "og:title", content: `${company.name} — ${company.tagline}` },
      { property: "og:description", content: company.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const services = [
  { icon: Code2, title: "Custom Software", desc: "Tailored platforms engineered for scale and reliability." },
  { icon: Globe, title: "Web Development", desc: "High-performance, SEO-ready web experiences." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform apps users love." },
  { icon: Bot, title: "AI & ML", desc: "Production-grade AI agents, copilots, and analytics." },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, Azure, GCP architectures with FinOps built-in." },
  { icon: ShieldCheck, title: "Cybersecurity", desc: "Zero-trust security, audits, and compliance." },
];

const products = [
  { icon: Layers, title: "HRMS", desc: "Complete HR lifecycle in one elegant suite." },
  { icon: Database, title: "CRM Platform", desc: "Pipeline, automation, and revenue intelligence." },
  { icon: GraduationCap, title: "LMS", desc: "Modern learning for institutions and enterprises." },
  { icon: ShoppingCart, title: "Inventory Suite", desc: "Realtime stock, POS, and supplier control." },
];

const industries = [
  { icon: Building2, label: "BFSI" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
  { icon: ShoppingCart, label: "Retail" },
  { icon: Factory, label: "Manufacturing" },
  { icon: BarChart3, label: "SaaS" },
];

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "PostgreSQL", "Kubernetes", "AWS", "Azure", "TensorFlow", "LangChain"];

const steps = [
  { n: "01", t: "Discover", d: "Workshops, audits, and a sharp problem statement." },
  { n: "02", t: "Design", d: "Architecture, UX, and a measurable roadmap." },
  { n: "03", t: "Build", d: "Agile delivery with weekly demoable increments." },
  { n: "04", t: "Launch & Scale", d: "Observability, SRE, and continuous improvement." },
];

const testimonials = [
  { q: "AxonCore rebuilt our core platform and cut our cloud spend by 38%.", a: "CTO, FinTech scale-up" },
  { q: "Their AI team shipped a production copilot in 9 weeks. Game-changing.", a: "Head of Product, SaaS" },
  { q: "Truly enterprise-grade engineering. Documentation and SRE were exceptional.", a: "VP Engineering, Healthcare" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <img src={hero} alt="" aria-hidden width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/40 blur-3xl animate-float" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-white">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5" /> Enterprise Technology Partner
            </span>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.05]">
              {company.tagline.split("'s")[0]}'s<br />
              <span className="text-gradient bg-clip-text">Digital Future</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              {company.name} partners with ambitious teams to design, engineer, and operate
              transformative software, AI, and cloud platforms — built to scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-[oklch(0.24_0.12_268)] hover:bg-white/90">
                <Link to="/contact">Start a project <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                <Link to="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 120, s: "+", l: "Projects Delivered" },
            { n: 45, s: "+", l: "Enterprise Clients" },
            { n: 12, s: "+", l: "Industries Served" },
            { n: 99, s: "%", l: "Client Retention" },
          ].map((x) => (
            <div key={x.l}>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient"><Counter to={x.n} suffix={x.s} /></div>
              <div className="mt-2 text-sm text-muted-foreground">{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Why AxonCore</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold">Built like a Fortune-500 partner</h2>
          <p className="mt-4 text-muted-foreground">We bring senior engineering, rigorous process, and obsession with outcomes to every engagement.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { i: Shield, t: "Enterprise-grade", d: "ISO-aligned process, security-first delivery, and compliance baked in." },
            { i: Zap, t: "Velocity", d: "Senior squads ship measurable value within weeks, not quarters." },
            { i: Cpu, t: "AI-native", d: "Modern AI woven into product, ops, and decisions from day one." },
          ].map((x) => (
            <Card key={x.t} className="p-6 hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
                <x.i className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Our Expertise</p>
              <h2 className="mt-2 text-4xl md:text-5xl font-bold">Featured services</h2>
            </div>
            <Button asChild variant="ghost"><Link to="/services">All services <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="group p-6 hover:shadow-glow transition-all hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Products</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold">Platforms that ship value on day one</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/products">All products <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card key={p.title} className="p-6 hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Industries we serve</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-4">
            {industries.map((i) => (
              <div key={i.label} className="glass rounded-xl p-5 text-center hover:shadow-elegant transition">
                <i.icon className="mx-auto h-7 w-7 text-primary" />
                <p className="mt-2 text-sm font-medium">{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold">Technology stack</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">A pragmatic, modern toolkit chosen for performance, maintainability, and team velocity.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {stack.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary transition">{t}</span>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl md:text-4xl font-bold">How we work</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <Card key={s.n} className="p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-6 font-display text-7xl font-bold text-primary/10">{s.n}</div>
                <Workflow className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-bold">Trusted by leaders</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.a} className="p-6">
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-3 text-base">{t.q}</p>
              <p className="mt-4 text-sm text-muted-foreground">— {t.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently asked</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              { q: "How quickly can we start?", a: "Most engagements kick off within 1–2 weeks of signing." },
              { q: "Do you work on fixed-bid or T&M?", a: "Both. We recommend a discovery sprint, then choose the right model." },
              { q: "Where is your team based?", a: "Headquartered in Hyderabad, India, with delivery across timezones." },
              { q: "Can you sign NDAs / DPAs?", a: "Absolutely — standard process before any technical discussion." },
              { q: "Do you support long-term maintenance?", a: "Yes — SLAs, SRE, and on-call coverage are part of our offerings." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`i${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 md:p-16 text-white shadow-glow">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl">Let's build what's next.</h2>
          <p className="mt-4 max-w-xl text-white/75">Tell us about your goals — we'll respond within one business day with a tailored plan.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-[oklch(0.24_0.12_268)] hover:bg-white/90">
              <Link to="/contact">Talk to an expert <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white">
              <a href={`https://wa.me/${company.whatsappRaw}`}>WhatsApp us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
