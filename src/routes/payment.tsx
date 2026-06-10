import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, IndianRupee, ShieldCheck } from "lucide-react";
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

function PaymentPage() {
  const [application, setApplication] = useState<{ id?: string; email?: string }>({});
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
      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500/15 text-green-600">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Payment received!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you. Our team will verify your transaction and reach out to <span className="font-medium">{application.email ?? "your email"}</span> within 24 hours.
        </p>
        <Button asChild className="mt-8 bg-[image:var(--gradient-brand)] text-white">
          <Link to="/">Back to home</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold">Application Received</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Your internship application has been submitted successfully. To confirm your enrollment, please complete the payment below.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Card className="p-8 text-center">
          <h2 className="font-display text-xl font-semibold">Scan to pay</h2>
          <p className="text-sm text-muted-foreground mt-1">Use any UPI app — GPay, PhonePe, Paytm, BHIM</p>
          <div className="mt-6 mx-auto w-fit rounded-2xl p-4 bg-white shadow-elegant">
            {/* Replace /qr.png anytime — code does not need changes */}
            <img src="/qr.png" alt="Payment QR Code" width={320} height={320} className="block w-[280px] h-[280px] object-contain" />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
            <IndianRupee className="h-4 w-4" /> Enrollment Fee
          </div>
          <div className="mt-6 text-left text-sm text-muted-foreground space-y-2">
            <p>• Scan the QR with your UPI app</p>
            <p>• Complete the payment</p>
            <p>• Capture a screenshot of the confirmation</p>
            <p>• Submit the details on the right</p>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="font-display text-xl font-semibold">Submit payment details</h2>
          <form
            className="mt-6 grid gap-5"
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
                const up = await supabase.storage.from("payment-screenshots").upload(path, screenshot, { contentType: screenshot.type });
                if (up.error) throw up.error;
                const ins = await supabase.from("payment_submissions").insert({
                  application_id: application.id ?? null,
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
              <Label htmlFor="screenshot">Upload payment screenshot</Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                required
                className="mt-1.5"
                onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              />
            </div>
            <div>
              <Label htmlFor="transaction_id">Transaction ID / UTR</Label>
              <Input id="transaction_id" name="transaction_id" required maxLength={120} className="mt-1.5" placeholder="e.g. 4xxxxxxxxxx" />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="bg-[image:var(--gradient-brand)] text-white hover:opacity-95 shadow-glow">
              {loading ? "Submitting…" : "Submit Payment"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Need help? WhatsApp us at <a className="underline" href={`https://wa.me/${company.whatsappRaw}`}>{company.whatsapp}</a>
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
