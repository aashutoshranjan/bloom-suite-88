import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  UserPlus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: `Membership Registration — ${company.name}` },
      { name: "description", content: "Register for membership at Nexorabloom Solutions." },
      { property: "og:title", content: `Membership Registration — ${company.name}` },
      { property: "og:description", content: "Register for membership at Nexorabloom Solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: MembershipPage,
});

// The five mandatory fields, validated before the candidate may continue.
const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  mobile: z
    .string()
    .trim()
    .regex(/^[+]?[0-9][0-9\s-]{5,18}$/, "Please enter a valid contact number"),
  position: z.string().trim().min(2, "Please enter the internship position").max(100),
  joining_date: z.string().min(1, "Please choose your date of joining"),
});

function MembershipPage() {
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

      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Header */}
        <div className="animate-fade-up text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
            <UserPlus className="h-7 w-7" />
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Membership registration
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Become a{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              Member
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Fill in your details to continue to the membership payment.
          </p>
        </div>

        {/* Registration form */}
        <Card className="glass mt-10 p-6 animate-fade-up [animation-delay:120ms] sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold md:text-2xl">Membership Details</h2>
              <p className="text-sm text-muted-foreground">All five fields are mandatory.</p>
            </div>
          </div>

          <form
            className="mt-6 grid gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (loading) return; // guard against duplicate submissions
              const fd = new FormData(e.currentTarget);
              const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
              if (!parsed.success) {
                toast.error(parsed.error.issues[0].message);
                return;
              }
              setLoading(true);
              try {
                // Save the candidate's details for the payment page, then continue.
                sessionStorage.setItem(
                  "axon_membership",
                  JSON.stringify({
                    full_name: parsed.data.full_name,
                    email: parsed.data.email,
                    mobile: parsed.data.mobile,
                    position: parsed.data.position,
                    joining_date: parsed.data.joining_date,
                  }),
                );
                toast.success("Details saved! Continuing to payment.");
                navigate({ to: "/payment-page" });
              } catch (err) {
                console.error("Saving membership details failed:", err);
                toast.error("We couldn't save your details. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <Field label="Full Name" name="full_name" placeholder="Your full name" />
            <Field label="Email ID" name="email" type="email" placeholder="you@example.com" />
            <Field label="Contact Number" name="mobile" type="tel" placeholder="e.g. +91 98765 43210" />
            <Field
              label="Internship Position"
              name="position"
              placeholder="e.g. Frontend Developer Intern"
            />
            <Field label="Date of Joining" name="joining_date" type="date" />

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full bg-[image:var(--gradient-brand)] text-white shadow-glow hover:opacity-95 sm:w-fit"
            >
              {loading ? (
                "Saving…"
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-border/60 pt-6 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> Secure payment
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" /> Verified process
            </span>
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
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
