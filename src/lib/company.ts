// Centralized company information — edit this file to update site-wide content.
export const company = {
  name: "AxonCore Technologies",
  shortName: "AxonCore",
  domain: "axonbloom.com",
  tagline: "Innovating Tomorrow's Digital Future",
  description:
    "AxonCore Technologies builds enterprise software, AI solutions, cloud platforms, and digital transformation programs for ambitious businesses.",
  email: "support@axonbloom.com",
  whatsapp: "+91 90608 86915",
  whatsappRaw: "919060886915",
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
