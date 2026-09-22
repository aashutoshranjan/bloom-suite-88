import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Clock,
  BadgeCheck,
  Mail,
  AlertCircle,
  Megaphone,
  GraduationCap,
} from "lucide-react";
import { company } from "@/lib/company";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: `Complete Enrollment — ${company.name}` },
      { name: "description", content: "Complete your internship enrollment payment." },
      { property: "og:title", content: `Complete Enrollment — ${company.name}` },
      { property: "og:description", content: "Complete your Axonbloom Talent internship enrollment payment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[image:var(--gradient-brand)] opacity-[0.08] blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Secure your seat
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Complete Your{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              Internship Enrollment
            </span>
          </h1>
          <p className="mt-3 font-display text-xl md:text-2xl text-foreground/80">
            Confirm Your Participation
          </p>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            To secure your place in the internship program, kindly complete your enrollment by paying
            the one-time <span className="font-semibold text-foreground">Internship Enrollment Fee</span>{" "}
            mentioned in your Offer Letter.
          </p>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Please verify the amount in your Offer Letter before making the payment.
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" /> Secure UPI
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" /> Verified Process
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> Verified in &lt; 24h
            </span>
          </div>
        </div>

        {/* Premium animated banner */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border/60 bg-background/40 backdrop-blur-xl">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div className="animate-fade-in">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Cohort open</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                Learn. Build. Get hired.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Mentor-led projects, real deliverables and a certificate that recruiters recognise.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Live mentorship", "Real projects", "Certificate", "Placement support"].map((t) => (
                  <span key={t} className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative grid place-items-center">
              <div className="relative h-48 w-48">
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

        {/* QR Card */}
        <Card className="mt-12 relative overflow-hidden p-0 border-border/60">
          <div className="absolute inset-0 bg-[image:var(--gradient-brand)] opacity-[0.07]" />
          <div className="relative p-8 md:p-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pay via UPI</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Scan to Pay</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Works with GPay, PhonePe, Paytm, BHIM &amp; all UPI apps
            </p>

            <div className="mt-8 mx-auto w-fit rounded-3xl p-5 bg-white shadow-elegant ring-1 ring-black/5">
              <img
                src="/qr.png"
                alt="Internship Enrollment Payment QR Code"
                width={320}
                height={320}
                className="block w-[260px] h-[260px] md:w-[300px] md:h-[300px] object-contain"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> Refer to your Offer Letter for the exact amount
            </div>

            <div className="mt-6 max-w-2xl mx-auto flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-foreground/90 text-left">
                <span className="font-semibold">Note:</span> If you pay via Any UPI App, the payment
                receiver may appear as either our company name or an authorized person’s name. Both
                are valid.
              </p>
            </div>
          </div>
        </Card>

        {/* Important Notice – Enrollment Confirmation */}
        <Card className="mt-10 p-8 md:p-10 border-amber-500/30 bg-amber-500/[0.06]">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500/15 text-amber-600">
              <Megaphone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-amber-700 dark:text-amber-400">
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
                  ). If You have any queries Feel free to write us on{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary underline hover:text-primary/80"
                  >
                    {company.email}
                  </a>
                </p>
                <p>
                  Sending this details via Email and via WhatsApp both are mandatory. Once we receive
                  your details, we will proceed with sending your confirmation email, login credentials,
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
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-background/60 p-4"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-sm font-medium text-foreground/90">{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-foreground/90">
                  <span className="font-semibold">Note:</span> Complete your enrolment and confirm
                  your seat ASAP. Limited seats are available. After the payment you will receive
                  Payment Receipt, Confirmation Email and Login Credentials to start your internship.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* After Completing the Payment */}
        <Card className="mt-10 p-8 md:p-10 border-border/60">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                After Completing the Payment
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                After completion of your enrollment process, please share the required details as
                mentioned and send your payment screenshot to our support team.
              </p>
            </div>
          </div>

          {/* Contact channels */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${company.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-5 transition hover:border-primary hover:bg-secondary/50"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="font-semibold truncate group-hover:text-primary transition">
                  {company.email}
                </p>
              </div>
            </a>
            <a
              href={`https://wa.me/${company.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-5 transition hover:border-primary hover:bg-secondary/50"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                <p className="font-semibold truncate group-hover:text-primary transition">
                  {company.whatsapp}
                </p>
              </div>
            </a>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-foreground/90">
              Sending these details is <span className="font-semibold">mandatory</span>. Once we
              receive and verify your submission, we will proceed with your enrollment process.
            </p>
          </div>
        </Card>

        {/* WhatsApp Support Contact Bar */}
        <Card className="mt-10 p-8 md:p-10 border-border/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold">
                  Need assistance with access or payment?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our onboarding support team is available on WhatsApp to help you with payment queries and enrollment steps.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${company.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with Onboarding Support on WhatsApp
            </a>
          </div>
        </Card>

        {/* Please share the following */}
        <Card className="mt-10 p-8 md:p-10 border-border/60">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Please Share the Following Details
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send these to our email or WhatsApp listed above.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {shareDetails.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{label}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* After Verification */}
        <Card className="mt-10 p-8 md:p-10 border-border/60">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            After Verification, You Will Receive
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {afterVerification.map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-secondary/30 p-5"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            These details will be sent to your registered email after successful payment verification.
          </p>
        </Card>

        {/* Important note */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Important Note</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete your enrolment and confirm your seat ASAP. Limited seats are available. After
              the payment you will receive Payment Receipt, Confirmation Email and Login Credentials
              to start your internship. Please ensure that all information provided is accurate and
              that your payment screenshot is clearly visible to avoid any delay in processing your
              enrollment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
