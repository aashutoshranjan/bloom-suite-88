// Centralized company information — edit this file to update site-wide content.
export const company = {
  name: "Axonbloom Talent",
  shortName: "Axonbloom",
  domain: "axonbloom.com",
  url: "https://axonbloom.com",
  tagline: "Innovating Tomorrow's Digital Future",
  description:
    "Axonbloom Talent builds enterprise software, AI solutions, cloud platforms, and digital transformation programs for ambitious businesses.",
  email: "support@axonbloom.com",
  whatsapp: "+91 92622 92190",
  whatsappRaw: "919262292190",
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
