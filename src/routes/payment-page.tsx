import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  Camera,
  Clock,
  Hash,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  User,
  Briefcase,
  CalendarDays,
} from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/payment-page")({
  head: () => ({
    meta: [
      { title: `Complete Membership Payment — ${company.name}` },
      { name: "description", content: "Complete your membership payment at Axonmet Technologies." },
      { property: "og:title", content: `Complete Membership Payment — ${company.name}` },
      {
        property: "og:description",
        content: "Complete your membership payment at Axonmet Technologies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: MembershipPaymentPage,
});

const trustItems = [
  { icon: Lock, label: "Secure UPI" },
  { icon: BadgeCheck, label: "Verified Process" },
  { icon: Clock, label: "Verified in < 24h" },
];

const detailsToSend = [
  { icon: Camera, label: "Payment Screenshot" },
  { icon: User, label: "Full Name" },
  { icon: Mail, label: "Email ID" },
  { icon: Phone, label: "Contact Number" },
  { icon: Briefcase, label: "Internship Position Applied For" },
  { icon: CalendarDays, label: "Cohort Date" },
  { icon: Hash, label: "Batch Code (mentioned in your email)" },
];

interface MembershipDetails {
  full_name?: string;
  email?: string;
  mobile?: string;
  position?: string;
  joining_date?: string;
}

function formatJoiningDate(iso: string | undefined): string {
  if (!iso) return "-";
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function MembershipPaymentPage() {
  const baseWhatsAppHref = `https://wa.me/${company.membershipWhatsappRaw}`;
  const [whatsAppHref, setWhatsAppHref] = useState(baseWhatsAppHref);

  // Prefill the WhatsApp message with the candidate's saved details, if any.
  // Runs after mount so the server-rendered markup always uses the plain link.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("axon_membership");
      if (!raw) return;
      const d = JSON.parse(raw) as MembershipDetails;
      const lines = [
        `Full Name: ${d.full_name || "-"}`,
        `Email ID: ${d.email || "-"}`,
        `Contact Number: ${d.mobile || "-"}`,
        `Internship Position Applied For: ${d.position || "-"}`,
        `Cohort Date: ${formatJoiningDate(d.joining_date)}`,
        `Batch Code: (mentioned in my email)`,
      ].join("\n");
      const text = `Hello ${company.name}! I have completed my membership payment and attached my payment screenshot.\n\n${lines}`;
      setWhatsAppHref(`${baseWhatsAppHref}?text=${encodeURIComponent(text)}`);
    } catch (err) {
      console.error("Reading saved membership details failed:", err);
    }
  }, [baseWhatsAppHref]);

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            Secure your seat
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Complete Your{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              Membership Payment
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            To secure your place in the internship program, kindly complete your Membership by
            paying the one-time{" "}
            <span className="font-semibold text-foreground">Membership Fee</span> mentioned in your
            Email. Please verify the amount in your Email before making payment.
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* QR Card */}
        <Card className="glass relative mt-12 animate-fade-up overflow-hidden p-0 [animation-delay:160ms]">
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-brand)] opacity-[0.06]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="relative p-6 text-center sm:p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pay via UPI</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Scan to Pay</h2>

            <div className="relative mx-auto mt-8 w-fit">
              {/* Pulsing halo behind the QR */}
              <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-3xl bg-primary/20 blur-2xl animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="rounded-3xl bg-white p-4 shadow-elegant ring-1 ring-black/5 sm:p-5">
                <img
                  src="/qr.png"
                  alt="Membership Payment QR Code"
                  width={320}
                  height={320}
                  className="block h-[220px] w-[220px] object-contain sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px]"
                />
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold text-foreground/90">
              Works with Paytm, PhonePe, BHIM &amp; all UPI apps except Google Pay.
            </p>
            <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              We do not accept payments via Google Pay.
            </div>
          </div>
        </Card>

        {/* Important Notice – Membership Confirmation */}
        <Card className="mt-10 animate-fade-up border-amber-500/30 bg-amber-500/[0.06] p-6 backdrop-blur-xl [animation-delay:240ms] sm:p-8 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500/15 text-amber-600">
              <Megaphone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold text-amber-700 dark:text-amber-400 md:text-3xl">
                Important Notice – Membership Confirmation
              </h2>

              <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  After payment, send your payment screenshot and the following details through
                  WhatsApp:
                </p>
                <p>
                  Sending these details via WhatsApp is{" "}
                  <span className="font-semibold text-foreground/90">mandatory</span>. Once verified,
                  we will send your payment receipt, confirmation email, login credentials, your
                  dedicated mentor&rsquo;s WhatsApp number, and your personalised internship offer
                  letter.
                </p>
              </div>

              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {detailsToSend.map(({ icon: Icon, label }, i) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-background/60 p-4 backdrop-blur transition-colors hover:border-amber-500/40"
                    style={{ animationDelay: `${320 + i * 60}ms` }}
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="min-w-0 text-sm font-medium text-foreground/90">{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
                <Mail className="h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-foreground/90">
                  <span className="font-semibold">Support Email:</span>{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary underline hover:text-primary/80"
                  >
                    {company.email}
                  </a>
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[image:var(--gradient-brand)] text-white shadow-glow hover:opacity-95 sm:w-fit"
                >
                  <a href={whatsAppHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Send Details on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
