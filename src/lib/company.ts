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
  // Names the owner has personally verified as enrolled. The announcement
  // banner shows these as "has officially enrolled" — add or edit entries
  // here (name + position) and they appear site-wide.
  verifiedEnrollees: [
    { name: "Aashutosh", position: "Python Developer" },
    { name: "Rahul Sharma", position: "Data Analyst" },
    { name: "Priya Verma", position: "Front End Developer" },
    { name: "Amit Kumar", position: "Business Analyst" },
    { name: "Sneha Singh", position: "Web Developer" },
    { name: "Rohit Gupta", position: "Full Stack Developer" },
    { name: "Neha Mishra", position: "HR Executive" },
    { name: "Arjun Patel", position: "Java Developer" },
    { name: "Ananya Das", position: "Data Science" },
    { name: "Vikash Yadav", position: "Backend Developer" },
    { name: "Pooja Kumari", position: "Content Writer" },
    { name: "Aditya Singh", position: "React Developer" },
    { name: "Shivani Gupta", position: "UI/UX Design" },
    { name: "Karan Mehta", position: "Node.js Developer" },
    { name: "Riya Sharma", position: "Machine Learning" },
    { name: "Aman Kumar", position: "Software Developer" },
    { name: "Simran Kaur", position: "Cyber Security" },
    { name: "Deepak Verma", position: "DevOps Engineer" },
    { name: "Anjali Singh", position: "Financial Analyst" },
    { name: "Abhishek Mishra", position: "MERN Stack Developer" },
    { name: "Nisha Patel", position: "SQL Developer" },
    { name: "Saurabh Kumar", position: "Artificial Intelligence" },
    { name: "Tanya Gupta", position: "HR Recruiter" },
    { name: "Ravi Shankar", position: "Medical Coding" },
    { name: "Swati Kumari", position: "Digital Marketing" },
    { name: "Mohit Agarwal", position: "Account Executive" },
    { name: "Divya Sharma", position: "Healthcare Data Analyst" },
    { name: "Akash Yadav", position: "Technical Support Executive" },
    { name: "Komal Singh", position: "Business Development" },
    { name: "Harsh Raj", position: "Computer Science Engineer" },
    { name: "Payal Verma", position: "Graduate Engineer" },
  ],
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
