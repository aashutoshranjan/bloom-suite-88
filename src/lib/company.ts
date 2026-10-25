// Centralized company information — edit this file to update site-wide content.
export const company = {
  name: "Axonmet Technologies",
  shortName: "Axonmet",
  domain: "axonbloom.com",
  url: "https://axonbloom.com",
  tagline: "Innovating Tomorrow's Digital Future",
  description:
    "Axonmet Technologies builds enterprise software, AI solutions, cloud platforms, and digital transformation programs for ambitious businesses.",
  email: "support@axonbloom.com",
  whatsapp: "+91 91022 66237",
  whatsappRaw: "919102266237",
  // Default UPI ID for enrollment payments. Override at runtime on your own
  // server by setting the UPI_ID environment variable (PM2 / .env) — no rebuild needed.
  upiId: "axonmettechnologies@ptyes",
  // Names the owner has personally verified as enrolled. Add entries like
  // { name: "Aashutosh", position: "Data Analyst" } — each appears in the
  // top announcement banner as "Congratulations! ... has officially enrolled".
  verifiedEnrollees: [] as { name: string; position: string }[],
  address: {
    line1: "45E/3, Behind Vyshnavi Cynosure",
    line2: "Telecom Nagar, Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    pin: "500032",
    country: "India",
  },
  hours: "Mon – Sat, 9:30 AM – 7:00 PM IST",
  social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    instagram: "#",
  },
} as const;

export const formattedAddress = `${company.address.line1}, ${company.address.line2}, ${company.address.city}, ${company.address.state} ${company.address.pin}`;
