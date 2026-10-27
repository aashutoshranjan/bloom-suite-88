import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { company } from "@/lib/company";

// Fetched server-side: recent REAL applications from the internship form.
// Only names and positions are returned — no emails or other private data.
const getRecentApplicants = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ full_name: string; position: string }[]> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("internship_applications")
        .select("full_name, position, created_at")
        .order("created_at", { ascending: false })
        .limit(15);
      if (error) return [];
      return (data ?? []).map((r) => ({ full_name: r.full_name, position: r.position }));
    } catch {
      return [];
    }
  }
);

// Generic open positions used until real applications exist (truthful fallback).
const OPEN_POSITIONS = [
  "Data Analyst",
  "Python Developer",
  "Front End Developer",
  "HTML/CSS Developer",
  "Business Analyst",
  "HR Executive",
  "SQL Developer",
  "Email & Chat Process",
  "Web Developer",
  "Data Science",
  "Machine Learning",
  "Software Developer",
  "Full Stack Developer",
  "Computer Science Engineer",
  "Medical Coding",
  "Backend Developer",
  "Account / MIS Executive",
  "Java Developer",
  "Graduate Engineer",
  "DevOps Engineer",
  "Customer Service And Email Process",
  "Financial Analyst",
  "Lab Technician",
  "Artificial Intelligence",
  "Cyber Security",
  "Healthcare Data Analyst",
  "Content Writer",
  "UI/UX Design",
  "Design Engineer",
  "React Developer",
  "MERN Stack Developer",
  "Ticketing Executive",
  "Account Executive",
  "Diploma Engineer",
  "HR Recruiter",
  "Node.js Developer",
  "Technical Support Executive",
  "Business Development",
  "Medical Billing",
  "Staff Nurse",
  "MBBS Doctor",
] as const;

type Message = { text: string; highlights: string[] };

function buildMessages(applicants: { full_name: string; position: string }[]): Message[] {
  const messages: Message[] = [];

  // Owner-verified enrollees (company.verifiedEnrollees) — shown as enrolled.
  for (const e of company.verifiedEnrollees) {
    messages.push({
      text: `Congratulations! ${e.name} has officially enrolled in the ${e.position} Intern program at ${company.name}!`,
      highlights: [e.name, e.position, company.name],
    });
  }

  // Real submissions: truthful wording — they applied (not "enrolled").
  for (const a of applicants) {
    messages.push({
      text: `${a.full_name} has officially applied for the ${a.position} Internship program at ${company.name}!`,
      highlights: [a.full_name, a.position, company.name],
    });
  }

  // Open positions are the truthful fallback only when the owner list and
  // real applications are both empty — never shown alongside names.
  if (messages.length === 0) {
    return OPEN_POSITIONS.map((p) => ({
      text: `Now enrolling for the ${p} Internship program at ${company.name} — limited seats!`,
      highlights: [p, company.name],
    }));
  }

  return messages;
}

function Highlighted({ message }: { message: Message }) {
  let parts = [message.text];
  for (const h of message.highlights) {
    const next: string[] = [];
    for (const part of parts) {
      if (!message.highlights.includes(part) && part.includes(h)) {
        const [before, ...rest] = part.split(h);
        next.push(before, h, rest.join(h));
      } else {
        next.push(part);
      }
    }
    parts = next;
  }
  return (
    <>
      {parts.map((part, i) =>
        message.highlights.includes(part) ? (
          <span key={i} className="text-banner-cyan font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function AnnouncementBanner() {
  const { data: applicants } = useQuery({
    queryKey: ["recent-applicants"],
    queryFn: getRecentApplicants,
    staleTime: 5 * 60 * 1000,
  });

  const list = buildMessages(applicants ?? []);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const listRef = useRef(list);
  listRef.current = list;

  // Respect reduced-motion preferences (browser-only check).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Rotate every 3.5s, never repeating the same message twice in a row.
  useEffect(() => {
    const len = listRef.current.length;
    if (index >= len) setIndex(0);
    const t = setInterval(() => {
      const n = listRef.current.length;
      if (n <= 1) {
        setIndex(0);
        return;
      }
      let next: number;
      do {
        next = Math.floor(Math.random() * n);
      } while (next === index);
      setIndex(next);
    }, 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length, index]);

  const message = list[index] ?? list[0];
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-40 flex min-h-11 items-center justify-center overflow-hidden bg-banner px-3 py-1.5 text-center md:h-12 md:py-0"
    >
      <p
        key={index}
        className={`line-clamp-2 whitespace-normal text-[10px] font-semibold leading-tight text-banner-foreground sm:text-xs md:truncate md:whitespace-nowrap md:text-sm ${
          animate ? "animate-banner-in" : ""
        }`}
      >
        <span aria-hidden="true" className="mr-1.5">
          🎉
        </span>
        <Highlighted message={message} />
      </p>
    </div>
  );
}
