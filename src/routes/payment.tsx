import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  CheckCircle2,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Lock,
  Clock,
  BadgeCheck,
  UploadCloud,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: `Complete Enrollment — ${company.name}` },
      { name: "description", content: "Complete your internship enrollment payment." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PaymentPage,
});

const schema = z.object({
  transaction_id: z.string().trim().min(4, "Enter transaction ID").max(120),
});

type Application = { email?: string; full_name?: string; position?: string };

function PaymentPage() {
  const [application, setApplication] = useState<Application>({});
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("axon_application");
      if (raw) setApplication(JSON.parse(raw));
    } catch {}
  }, []);

  if (done) {
    return (
      <section className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[image:var(--gradient-brand)] opacity-10 blur-3xl rounded-full" />
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/15 text-green-600 ring-8 ring-green-500/5">
          <CheckCircle2 className="h-11 w-11" />
        </div>
        <h1 className="mt-8 font-display text-4xl md:text-5xl font-bold">Payment received</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Thank you{application.full_name ? `, ${application.full_name.split(" ")[0]}` : ""}. Our enrollment team will verify your transaction
          and reach out to{" "}
          <span className="font-semibold text-foreground">{application.email ?? "your email"}</span> within 24 hours.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-[image:var(--gradient-brand)] text-white shadow-glow">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`https://wa.me/${company.whatsappRaw}`} target="_blank" rel="noreferrer">
              Chat with us
            </a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[image:var(--gradient-brand)] opacity-[0.08] blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Step 2 of 2 — Secure your seat
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Complete your{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">enrollment</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            {application.full_name ? (
              <>
                Welcome, <span className="font-semibold text-foreground">{application.full_name}</span>. Your application
                {application.position ? (
                  <>
                    {" "}for <span className="font-semibold text-foreground">{application.position}</span>
                  </>
                ) : null}{" "}
                is reserved. Finish payment below to lock in your spot.
              </>
            ) : (
              <>Your application is reserved. Finish payment below to lock in your spot.</>
            )}
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" /> 256-bit secured
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" /> Verified UPI
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> Verified in &lt; 24h
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* QR / Pay panel */}
          <Card className="lg:col-span-2 relative overflow-hidden p-0 border-border/60">
            <div className="absolute inset-0 bg-[image:var(--gradient-brand)] opacity-[0.08]" />
            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Pay via UPI</p>
                  <h2 className="font-display text-2xl font-semibold mt-1">Scan to pay</h2>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure
                </div>
              </div>

              {/* QR card */}
              <div className="mt-7 mx-auto w-fit rounded-3xl p-5 bg-white shadow-elegant ring-1 ring-black/5">
                <img
                  src="/qr.png"
                  alt="Payment QR Code"
                  width={320}
                  height={320}
                  className="block w-[260px] h-[260px] object-contain"
                />
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold shadow-elegant">
                  <IndianRupee className="h-4 w-4" /> Enrollment Fee
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Works with GPay, PhonePe, Paytm, BHIM & all UPI apps
              </p>
            </div>
          </Card>

          {/* Submit panel */}
          <Card className="lg:col-span-3 p-8 md:p-10 border-border/60">
            {/* Stepper */}
            <ol className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs font-medium">
              {[
                { n: 1, t: "Scan QR" },
                { n: 2, t: "Pay & screenshot" },
                { n: 3, t: "Submit details" },
              ].map((s) => (
                <li
                  key={s.n}
                  className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/40 px-3 py-2"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-white text-[11px] font-bold">
                    {s.n}
                  </span>
                  <span className="text-foreground/80">{s.t}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-8 font-display text-2xl font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" /> Submit payment details
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Upload the payment confirmation and we'll verify it within 24 hours.
            </p>

            <form
              className="mt-7 grid gap-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const tx = String(fd.get("transaction_id") ?? "");
                const parsed = schema.safeParse({ transaction_id: tx });
                if (!parsed.success) {
                  toast.error(parsed.error.issues[0].message);
                  return;
                }
                if (!screenshot) {
                  toast.error("Upload a payment screenshot");
                  return;
                }
                if (screenshot.size > 8 * 1024 * 1024) {
                  toast.error("Screenshot must be under 8MB");
                  return;
                }
                setLoading(true);
                try {
                  const path = `${Date.now()}-${screenshot.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
                  const up = await supabase.storage
                    .from("payment-screenshots")
                    .upload(path, screenshot, { contentType: screenshot.type });
                  if (up.error) throw up.error;
                  const ins = await supabase.from("payment_submissions").insert({
                    applicant_email: application.email ?? null,
                    transaction_id: parsed.data.transaction_id,
                    screenshot_url: up.data.path,
                  });
                  if (ins.error) throw ins.error;
                  toast.success("Payment submitted!");
                  setDone(true);
                } catch (err) {
                  console.error(err);
                  toast.error(err instanceof Error ? err.message : "Submission failed");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div>
                <Label htmlFor="screenshot" className="text-sm font-medium">
                  Payment screenshot
                </Label>
                <label
                  htmlFor="screenshot"
                  className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 px-6 py-8 text-center cursor-pointer transition hover:border-primary hover:bg-secondary/50"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-white shadow-glow">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">
                      {screenshot ? screenshot.name : "Click to upload screenshot"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">PNG / JPG, up to 8MB</div>
                </label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  required
                  className="sr-only"
                  onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
                />
              </div>

              <div>
                <Label htmlFor="transaction_id" className="text-sm font-medium">
                  Transaction ID / UTR
                </Label>
                <Input
                  id="transaction_id"
                  name="transaction_id"
                  required
                  maxLength={120}
                  className="mt-2 h-12"
                  placeholder="e.g. 4xxxxxxxxxx"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Find this in your UPI app under recent transactions.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="h-12 bg-[image:var(--gradient-brand)] text-white hover:opacity-95 shadow-glow group"
              >
                {loading ? "Submitting…" : (
                  <>
                    Confirm enrollment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Your data is encrypted
                </span>
                <span>
                  Need help?{" "}
                  <a
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    href={`https://wa.me/${company.whatsappRaw}`}
                  >
                    WhatsApp {company.whatsapp}
                  </a>
                </span>
              </div>
            </form>
          </Card>
        </div>

        {/* Reassurance footer */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "100% Secure", d: "End-to-end encrypted transactions." },
            { icon: BadgeCheck, t: "Verified Process", d: "Manual review by our enrollment team." },
            { icon: Clock, t: "Fast Confirmation", d: "You'll hear back within 24 hours." },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
