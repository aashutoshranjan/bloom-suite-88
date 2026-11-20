import { z } from "zod";

export const internshipProgramCategories = [
  "IT & Software",
  "Data & AI",
  "Healthcare & Medical",
  "Business, HR & Finance",
  "Operations & Support",
] as const;

export type InternshipProgramCategory = (typeof internshipProgramCategories)[number];

export const internshipProgramDurationOptions = ["1", "2", "3"] as const;

export const internshipProgramEnrollmentSchema = z.object({
  internship_domain: z.string().min(1, "Choose an internship program"),
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9][0-9\s()-]{5,18}$/, "Enter a valid phone number"),
  preferred_duration: z.enum(internshipProgramDurationOptions),
});

export type InternshipProgramEnrollment = z.infer<typeof internshipProgramEnrollmentSchema>;

export interface InternshipProgram {
  title: string;
  category: InternshipProgramCategory;
  skills: readonly [string, string, string];
}

export const internshipPrograms: readonly InternshipProgram[] = [
  { title: "Data Analyst", category: "Data & AI", skills: ["SQL", "Data cleaning", "Dashboards"] },
  { title: "Python Developer", category: "IT & Software", skills: ["Python", "APIs", "Testing"] },
  { title: "Front End Developer", category: "IT & Software", skills: ["HTML/CSS", "JavaScript", "Responsive UI"] },
  { title: "HTML/CSS Developer", category: "IT & Software", skills: ["Semantic HTML", "CSS layouts", "Accessibility"] },
  { title: "Business Analyst", category: "Business, HR & Finance", skills: ["Requirements", "Process maps", "Reporting"] },
  { title: "HR Executive", category: "Business, HR & Finance", skills: ["Recruitment", "HR operations", "Documentation"] },
  { title: "SQL Developer", category: "Data & AI", skills: ["SQL queries", "Data modeling", "Optimization"] },
  { title: "Email & Chat Process", category: "Operations & Support", skills: ["Written support", "Case handling", "Service quality"] },
  { title: "Web Developer", category: "IT & Software", skills: ["Web fundamentals", "JavaScript", "Deployment"] },
  { title: "Data Science", category: "Data & AI", skills: ["Python", "Exploratory analysis", "Modeling"] },
  { title: "Machine Learning", category: "Data & AI", skills: ["Feature engineering", "Model evaluation", "Python"] },
  { title: "Software Developer", category: "IT & Software", skills: ["Programming", "Git", "Debugging"] },
  { title: "Full Stack Developer", category: "IT & Software", skills: ["Frontend", "Backend APIs", "Databases"] },
  { title: "Computer Science Engineer", category: "IT & Software", skills: ["Algorithms", "Systems", "Software design"] },
  { title: "Medical Coding", category: "Healthcare & Medical", skills: ["Medical terminology", "Code sets", "Records"] },
  { title: "Backend Developer", category: "IT & Software", skills: ["API design", "Databases", "Security basics"] },
  { title: "Account / MIS Executive", category: "Business, HR & Finance", skills: ["Spreadsheets", "MIS reports", "Reconciliation"] },
  { title: "Java Developer", category: "IT & Software", skills: ["Java", "Object-oriented design", "Testing"] },
  { title: "Graduate Engineer", category: "IT & Software", skills: ["Engineering methods", "Technical reporting", "Problem solving"] },
  { title: "DevOps Engineer", category: "IT & Software", skills: ["CI/CD", "Containers", "Monitoring"] },
  { title: "Customer Service And Email Process", category: "Operations & Support", skills: ["Customer care", "Email writing", "Issue resolution"] },
  { title: "Financial Analyst", category: "Business, HR & Finance", skills: ["Financial models", "Excel", "Variance analysis"] },
  { title: "Lab Technician", category: "Healthcare & Medical", skills: ["Lab procedures", "Sample handling", "Quality records"] },
  { title: "Artificial Intelligence", category: "Data & AI", skills: ["AI concepts", "Prompt design", "Responsible AI"] },
  { title: "Cyber Security", category: "IT & Software", skills: ["Security fundamentals", "Threat analysis", "Risk reporting"] },
  { title: "Healthcare Data Analyst", category: "Healthcare & Medical", skills: ["Healthcare datasets", "Data quality", "Reporting"] },
  { title: "Content Writer", category: "Operations & Support", skills: ["Research", "Editorial writing", "Content planning"] },
  { title: "UI/UX Design", category: "IT & Software", skills: ["User research", "Wireframes", "Prototyping"] },
  { title: "Design Engineer", category: "IT & Software", skills: ["Design systems", "Prototyping", "Technical handoff"] },
  { title: "React Developer", category: "IT & Software", skills: ["React", "Component design", "State management"] },
  { title: "Mern Stack Developer", category: "IT & Software", skills: ["MongoDB", "Express", "React / Node.js"] },
  { title: "Ticketing Executive", category: "Operations & Support", skills: ["Ticket triage", "SLA tracking", "Customer updates"] },
  { title: "Account Executive", category: "Business, HR & Finance", skills: ["Client communication", "CRM workflows", "Pipeline tracking"] },
  { title: "Diploma Engineer", category: "IT & Software", skills: ["Technical drawings", "Quality checks", "Project records"] },
  { title: "HR Recruiter", category: "Business, HR & Finance", skills: ["Candidate sourcing", "Interview coordination", "ATS workflows"] },
  { title: "Node.js Developer", category: "IT & Software", skills: ["Node.js", "REST APIs", "Asynchronous code"] },
  { title: "Technical Support Executive", category: "Operations & Support", skills: ["Troubleshooting", "Knowledge base", "Support cases"] },
  { title: "Business Development", category: "Business, HR & Finance", skills: ["Market research", "Lead qualification", "Business communication"] },
  { title: "Medical Billing", category: "Healthcare & Medical", skills: ["Billing workflows", "Claims basics", "Record accuracy"] },
  { title: "Staff Nurse", category: "Healthcare & Medical", skills: ["Patient care", "Clinical records", "Care coordination"] },
  { title: "MBBS Doctor", category: "Healthcare & Medical", skills: ["Clinical reasoning", "Case documentation", "Patient safety"] },
  { title: "Pharmacy Assistant", category: "Healthcare & Medical", skills: ["Medication records", "Inventory", "Pharmacy workflows"] },
  { title: "Medical Research", category: "Healthcare & Medical", skills: ["Research methods", "Literature review", "Data interpretation"] },
  { title: "Medical Scribe", category: "Healthcare & Medical", skills: ["Clinical documentation", "Medical terminology", "Record accuracy"] },
];