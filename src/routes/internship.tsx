import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { appendInternshipToGoogleSheet } from "@/lib/api/internship-sheets.functions";
import {
  GraduationCap,
  Megaphone,
  AlertCircle,
  Camera,
  User,
  Mail,
  Phone,
  Briefcase,
  CalendarDays,
  Hash,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/internship")({
  head: () => ({
    meta: [
      { title: `Internship Application — ${company.name}` },
      { name: "description", content: "Apply for an internship at Axonmet Technologies." },
      { property: "og:title", content: `Internship Application — ${company.name}` },
      { property: "og:description", content: "Apply for an internship at Axonmet Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: InternshipPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  position: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(120),
  start_date: z.string().min(1, "Pick a date"),
});

function InternshipPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -right-28 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Header */}
        <div className="animate-fade-up text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Cohort open — limited seats
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Internship{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              Application
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Build the future with us. Tell us about yourself.
          </p>
        </div>

        {/* Premium animated banner */}
        <div className="glass relative mt-10 overflow-hidden rounded-3xl animate-fade-up [animation-delay:120ms]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
          <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:p-12">
            <div className="animate-fade-up [animation-delay:200ms]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Cohort open</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                Learn. Build.{" "}
                <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
                  Get hired.
                </span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Mentor-led projects, real deliverables and a certificate that recruiters recognise.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Live mentorship", "Real projects", "Certificate", "Placement support"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative grid place-items-center">
              <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_14s_linear_infinite]">
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
                </div>
                <div className="absolute inset-6 rounded-full border border-fuchsia-500/30 animate-[spin_9s_linear_infinite_reverse]">
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-500" />
                </div>
                <div className="absolute inset-12 grid place-items-center rounded-full bg-[image:var(--gradient-brand)] text-white shadow-glow animate-[pulse_3s_ease-in-out_infinite]">
                  <GraduationCap className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application form */}
        <Card className="glass mt-10 p-6 animate-fade-up [animation-delay:240ms] sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold md:text-2xl">Application Details</h2>
              <p className="text-sm text-muted-foreground">Takes less than a minute.</p>
            </div>
          </div>

          <form
            className="mt-6 grid gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (loading) return; // guard against duplicate submissions
              const fd = new FormData(e.currentTarget);
              const data = Object.fromEntries(fd.entries());
              const parsed = schema.safeParse(data);
              if (!parsed.success) {
                toast.error(parsed.error.issues[0].message);
                return;
              }
              setLoading(true);
              try {
                // 1. Append to the owner's Google Sheet. The candidate only
                //    continues once the server confirms the row was written.
                await appendInternshipToGoogleSheet({ data: parsed.data });

                // 2. Log the application in the site database (best effort —
                //    a failure here must never block the candidate's flow).
                try {
                  // Map to existing schema (mobile, college, qualification are required NOT NULL).
                  const ins = await supabase.from("internship_applications").insert({
                    full_name: parsed.data.full_name,
                    email: parsed.data.email,
                    position: parsed.data.position,
                    location: parsed.data.location,
                    start_date: parsed.data.start_date,
                    mobile: "-",
                    college: "-",
                    qualification: "-",
                    notes: "",
                  });
                  if (ins.error) console.error("Application log failed:", ins.error.message);
                } catch (dbErr) {
                  console.error("Application log failed:", dbErr);
                }

                // 3. Carry the summary to the payment page and redirect.
                sessionStorage.setItem(
                  "axon_application",
                  JSON.stringify({
                    email: parsed.data.email,
                    full_name: parsed.data.full_name,
                    position: parsed.data.position,
                  })
                );
                toast.success("Application received! Complete enrollment payment.");
                navigate({ to: "/payment" });
              } catch (err) {
                // Technical details stay in the logs; the candidate sees a
                // friendly message and can retry — entered details are kept.
                console.error("Google Sheets submission failed:", err);
                toast.error("We couldn't submit your application. Please try again in a moment.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="full_name" />
              <Field label="Email address" name="email" type="email" />
              <Field label="Internship position" name="position" placeholder="e.g. Frontend Developer Intern" />
              <Field label="Current location" name="location" />
              <Field label="Preferred starting date" name="start_date" type="date" className="sm:col-span-2" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full bg-[image:var(--gradient-brand)] text-white shadow-glow hover:opacity-95 sm:w-fit"
            >
              {loading ? (
                "Submitting…"
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Important Notice – Enrollment Confirmation */}
        <Card className="mt-10 animate-fade-up border-amber-500/30 bg-amber-500/[0.06] p-6 backdrop-blur-xl [animation-delay:320ms] sm:p-8 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500/15 text-amber-600">
              <Megaphone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold text-amber-700 dark:text-amber-400 md:text-3xl">
                Important Notice – Enrollment Confirmation
              </h2>

              <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-foreground/90">Confirm Your Participation:</span>{" "}
                  To secure your place in the program, please complete the enrolment process by paying
                  the internship enrollment fee as specified in your Offer Letter.
                </p>
                <p>
                  After completion of your enrollment process, please share the required details as
                  mentioned and send your payment screenshot to our support team at{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary underline hover:text-primary/80"
                  >
                    {company.email}
                  </a>{" "}
                  / or At WhatsApp (
                  <a
                    href={`https://wa.me/${company.whatsappRaw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    {company.whatsapp}
                  </a>
                  )
                </p>
                <p>
                  Sending this details via Email and via WhatsApp both are mandatory. Once we receive
                  your email, we will proceed with sending your confirmation email, login credentials,
                  and the WhatsApp number of your dedicated mentor.
                </p>
              </div>

              <h3 className="mt-6 font-semibold text-foreground/90">
                Please share the following details:
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Camera, label: "Payment Screenshot" },
                  { icon: User, label: "Full Name" },
                  { icon: Mail, label: "Email ID" },
                  { icon: Phone, label: "Contact Number" },
                  { icon: Briefcase, label: "Internship Position Applied For" },
                  { icon: CalendarDays, label: "Cohort Date" },
                  { icon: Hash, label: "Batch Code: (Mentioned in Offer letter)" },
                ].map(({ icon: Icon, label }, i) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-background/60 p-4 backdrop-blur transition-colors hover:border-amber-500/40"
                    style={{ animationDelay: `${400 + i * 60}ms` }}
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="min-w-0 text-sm font-medium text-foreground/90">{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-foreground/90">
                  <span className="font-semibold">Note:</span> Complete your enrolment and confirm
                  your seat ASAP. Limited seats are available. After the payment you will receive
                  Payment Receipt, Confirmation Email and Login Credentials.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="mt-1.5 h-11 rounded-xl border-border/70 bg-background/60 backdrop-blur transition-colors focus:border-primary/60 focus-visible:ring-primary/30"
      />
    </div>
  );
}
