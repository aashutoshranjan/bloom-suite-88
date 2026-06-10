import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Compass, Sparkles, Award, Users, TrendingUp } from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${company.name}` },
      { name: "description", content: `Learn about ${company.name}, our mission, vision, values, and why enterprises partner with us.` },
      { property: "og:title", content: `About — ${company.name}` },
      { property: "og:description", content: `Mission, vision, and values behind ${company.name}.` },
    ],
  }),
  component: AboutPage,
});

const values = [
  { i: Target, t: "Our Mission", d: "Engineer technology that compounds business outcomes — measurable, durable, and humane." },
  { i: Eye, t: "Our Vision", d: "Be the most trusted partner for enterprises building intelligent, AI-native software." },
  { i: Heart, t: "Core Values", d: "Craft, candor, customer obsession, and continuous learning anchor every decision." },
  { i: Compass, t: "Leadership Philosophy", d: "Servant leaders. Operators first. We measure success by what our teams ship." },
  { i: Sparkles, t: "Innovation Focus", d: "We invest in AI, data, and platform engineering R&D to stay ahead of curves." },
  { i: Award, t: "Quality Commitment", d: "Security reviews, automated testing, and SRE rigor on every release." },
  { i: Users, t: "Customer First", d: "Direct access to senior engineering. No layers. No spin. Just outcomes." },
  { i: TrendingUp, t: "Growth Journey", d: "From a focused engineering team to a multi-disciplinary enterprise partner." },
];

function AboutPage() {
  return (
    <>
      <section className="relative bg-[image:var(--gradient-hero)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-sm uppercase tracking-wider text-white/70">About {company.shortName}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold max-w-3xl">A modern technology partner for ambitious enterprises.</h1>
          <p className="mt-6 max-w-2xl text-white/75 text-lg">{company.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Company Overview</h2>
            <p className="mt-4 text-muted-foreground">
              {company.name} is a full-stack technology firm specializing in custom software, AI/ML, cloud, and
              digital transformation. We combine senior engineering with disciplined delivery to ship outcomes
              that move the needle.
            </p>
            <p className="mt-4 text-muted-foreground">
              Headquartered in Hyderabad, India, we serve startups, scale-ups, and Fortune-class enterprises
              across BFSI, healthcare, retail, education, manufacturing, and SaaS.
            </p>
          </div>
          <Card className="p-8 bg-[image:var(--gradient-soft)]">
            <h3 className="font-display text-xl font-semibold">Why businesses choose us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>• Senior, full-time engineers on every engagement</li>
              <li>• Outcome-based delivery with weekly demoable releases</li>
              <li>• AI-native architecture and modern cloud foundations</li>
              <li>• Security, compliance, and observability by default</li>
              <li>• Long-term partnership — not a staffing arrangement</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl md:text-4xl font-bold">What guides us</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.t} className="p-6 hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
                  <v.i className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
