import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Globe, Smartphone, Bot, Cloud, Palette, Building, Database, ShoppingBag, Webhook, Rocket, Lightbulb, Settings, ShieldCheck, LifeBuoy } from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services — ${company.name}` },
      { name: "description", content: "Custom software, AI, cloud, mobile, ERP, e-commerce, DevOps, security, and digital transformation services." },
      { property: "og:title", content: `Services — ${company.name}` },
      { property: "og:description", content: "Full-spectrum technology services from AxonCore Technologies." },
    ],
  }),
  component: ServicesPage,
});

const items = [
  { i: Code2, t: "Custom Software Development", d: "Bespoke platforms engineered for scale, performance, and longevity.", b: ["Domain-driven design", "Cloud-native"] },
  { i: Globe, t: "Website Development", d: "Marketing, commerce, and product sites that convert.", b: ["SEO + performance", "Headless CMS"] },
  { i: Smartphone, t: "Mobile App Development", d: "iOS, Android, and React Native apps users love.", b: ["Offline-first", "App store launch"] },
  { i: Bot, t: "AI & Machine Learning", d: "LLM agents, RAG, vision, and predictive analytics in production.", b: ["LangChain / OpenAI", "MLOps"] },
  { i: Cloud, t: "Cloud Services", d: "AWS, Azure, GCP architectures with FinOps and SRE.", b: ["IaC (Terraform)", "Multi-region"] },
  { i: Palette, t: "UI/UX Design", d: "Research-led product design that lifts every metric.", b: ["Design systems", "Usability testing"] },
  { i: Building, t: "Enterprise Solutions", d: "Mission-critical systems integrated across your org.", b: ["SSO + RBAC", "Compliance"] },
  { i: Database, t: "ERP & CRM Development", d: "Process automation and revenue intelligence platforms.", b: ["Workflow engine", "Reporting"] },
  { i: ShoppingBag, t: "E-commerce Development", d: "Storefronts, marketplaces, and headless commerce.", b: ["Shopify / Medusa", "Payments"] },
  { i: Webhook, t: "API Development", d: "REST, GraphQL, and event-driven integrations.", b: ["OpenAPI docs", "Versioning"] },
  { i: Rocket, t: "Digital Transformation", d: "From legacy monoliths to modern, intelligent platforms.", b: ["Cloud migration", "Modernization"] },
  { i: Lightbulb, t: "IT Consulting", d: "Architecture reviews, tech strategy, and team scaling.", b: ["CTO advisory", "Audits"] },
  { i: Settings, t: "DevOps", d: "CI/CD, Kubernetes, and platform engineering.", b: ["GitOps", "Observability"] },
  { i: ShieldCheck, t: "Cybersecurity Solutions", d: "Zero-trust, audits, pentests, and compliance.", b: ["SOC2 / ISO", "SIEM"] },
  { i: LifeBuoy, t: "Maintenance & Support", d: "24×7 SRE, on-call, and continuous improvement.", b: ["SLA-backed", "Roadmap support"] },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-sm uppercase tracking-wider text-white/70">Services</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">Engineering excellence, end-to-end.</h1>
          <p className="mt-6 max-w-2xl text-white/75 text-lg">From discovery to operations, we deliver outcomes across the full technology stack.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Card key={s.t} className="group p-6 hover:shadow-glow transition-all hover:-translate-y-1 flex flex-col">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white transition">
                <s.i className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {s.b.map((b) => <li key={b} className="text-muted-foreground">• {b}</li>)}
              </ul>
              <div className="mt-6 pt-4 border-t border-border">
                <Button asChild variant="ghost" size="sm" className="px-0 text-primary hover:text-primary">
                  <Link to="/contact">Discuss your project <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-[image:var(--gradient-brand)] p-10 md:p-14 text-white shadow-glow">
          <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">Need something custom? We probably build it.</h2>
          <p className="mt-3 max-w-xl text-white/80">Tell us your goals and constraints — we'll respond with a clear plan.</p>
          <Button asChild size="lg" className="mt-6 bg-white text-[oklch(0.24_0.12_268)] hover:bg-white/90">
            <Link to="/contact">Contact our team</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
