import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users2, Briefcase, GraduationCap, Boxes, UserSearch, HeartPulse, School, CalendarCheck, Bot, Workflow } from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: `Products — ${company.name}` },
      { name: "description", content: "HRMS, CRM, LMS, ERP, hospital and school management, AI chatbots, and workflow automation by AxonCore." },
      { property: "og:title", content: `Products — ${company.name}` },
      { property: "og:description", content: "Enterprise-grade platforms ready to deploy." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  { i: Users2, t: "HR Management System", d: "Onboarding, payroll, leave, performance — one elegant suite.", f: ["Self-service portal", "Payroll engine", "Performance reviews"] },
  { i: Briefcase, t: "CRM Platform", d: "Pipeline, automation, and revenue intelligence.", f: ["Multi-channel inbox", "Workflow automation", "Forecasting"] },
  { i: GraduationCap, t: "Learning Management System", d: "Courses, cohorts, and assessments for enterprise learning.", f: ["SCORM/xAPI", "Live classes", "Certifications"] },
  { i: Boxes, t: "Inventory Management", d: "Realtime stock, POS, suppliers, and warehouses.", f: ["Barcode/RFID", "Multi-warehouse", "Reorder rules"] },
  { i: UserSearch, t: "Recruitment Portal", d: "ATS with sourcing, interviews, and offer management.", f: ["Job boards", "Resume parsing", "Scorecards"] },
  { i: HeartPulse, t: "Hospital Management", d: "OPD, IPD, pharmacy, lab, and billing in one HIS.", f: ["EMR", "Pharmacy & lab", "Insurance claims"] },
  { i: School, t: "School ERP", d: "Admissions to alumni — every workflow connected.", f: ["Fee management", "Timetable", "Parent app"] },
  { i: CalendarCheck, t: "Attendance Management", d: "Biometric, geofence, and shift-aware attendance.", f: ["Face recognition", "Geofencing", "Shift planner"] },
  { i: Bot, t: "AI Chatbot Platform", d: "Build, deploy, and scale enterprise AI assistants.", f: ["RAG / knowledge", "Multi-LLM", "Analytics"] },
  { i: Workflow, t: "Workflow Automation Suite", d: "No-code workflows across apps and people.", f: ["Visual builder", "300+ connectors", "SLA tracking"] },
];

function ProductsPage() {
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-sm uppercase tracking-wider text-white/70">Products</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">Ready-to-deploy enterprise platforms.</h1>
          <p className="mt-6 max-w-2xl text-white/75 text-lg">Tailor-ready products that accelerate your roadmap by months.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.t} className="group p-6 hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition">
                <p.i className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.f.map((x) => (
                  <li key={x} className="text-muted-foreground flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />{x}</li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-border">
                <Button asChild variant="ghost" size="sm" className="px-0 text-primary hover:text-primary">
                  <Link to="/contact">Learn more <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
