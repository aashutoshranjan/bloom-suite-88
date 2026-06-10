import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap } from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/internship")({
  head: () => ({
    meta: [
      { title: `Internship Application — ${company.name}` },
      { name: "description", content: "Apply for an internship at AxonCore Technologies." },
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
  batch_code: z.string().trim().min(2).max(60),
});

function InternshipPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold">Internship Application</h1>
        <p className="mt-3 text-muted-foreground">Build the future with us. Tell us about yourself.</p>
      </div>

      <Card className="mt-10 p-6 md:p-8">
        <form
          className="grid gap-5"
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
                notes: `Batch Code: ${parsed.data.batch_code}`,
              });
              if (ins.error) throw ins.error;
              sessionStorage.setItem(
                "axon_application",
                JSON.stringify({
                  email: parsed.data.email,
                  full_name: parsed.data.full_name,
                  position: parsed.data.position,
                  batch_code: parsed.data.batch_code,
                })
              );
              toast.success("Application received! Complete enrollment payment.");
              navigate({ to: "/payment" });
            } catch (err) {
              console.error(err);
              toast.error(err instanceof Error ? err.message : "Submission failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" name="full_name" />
            <Field label="Email address" name="email" type="email" />
            <Field label="Internship position" name="position" placeholder="e.g. Frontend Developer Intern" />
            <Field label="Current location" name="location" />
            <Field label="Preferred starting date" name="start_date" type="date" />
            <Field label="Batch code" name="batch_code" placeholder="As mentioned in your Offer Letter" />
          </div>
          <Button type="submit" disabled={loading} size="lg" className="bg-[image:var(--gradient-brand)] text-white hover:opacity-95 shadow-glow w-fit">
            {loading ? "Submitting…" : "Submit Application"}
          </Button>
        </form>
      </Card>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required className="mt-1.5" />
    </div>
  );
}
