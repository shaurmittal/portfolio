// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Shaurya Mittal",
  photo: "/images/shaurya.jpg",
  tagline: "I build AI tools people actually use at work.",
  school: "University of Waterloo",
  program: "Honours Computer Science, Co-op",
  gradYear: 2030,
  role: "AI / SWE",
  status: "Open to Winter 2027 co-op roles",
  // icon: "soccer" | "gaming" | "ai" (drawn in components/Icons.tsx)
  interests: [
    { icon: "soccer", label: "Soccer" },
    { icon: "gaming", label: "Video games" },
    { icon: "ai", label: "AI" },
  ],
  links: {
    resume: "/Shaurya_Mittal_Resume.pdf",
    github: "https://github.com/shaurmittal",
    linkedin: "https://www.linkedin.com/in/shaurya2114",
    email: "mailto:shaurya.mittal@uwaterloo.ca",
  },
};

export type Flight = {
  code: string;
  kind: "experience" | "project";
  destination: string;
  year: string;
  status: "landed" | "in-air";
  when: string;
  title: string;
  org?: string;
  stack: string[];
  points: string[];
  links?: { label: string; href: string }[];
};

export const flights: Flight[] = [
  {
    code: "SM261",
    kind: "experience",
    destination: "DOCEBO · AI ENG",
    year: "2026",
    status: "landed",
    when: "May – Aug 2026",
    title: "AI Solutions Engineering Intern",
    org: "Docebo Inc. · Toronto, ON",
    stack: ["React", "Next.js", "AWS", "MCP", "Glean", "GitLab"],
    points: [
      "Built and shipped a full-stack agent feedback dashboard (React, Glean OAuth, AWS CloudWatch/S3/Athena) with self-service, role-scoped access, replacing manual data pulls by the AI Operations team.",
      "Engineered a company-wide AI Tools & Product Directory (Next.js, MCP server, GitLab-backed) cataloging agents, apps, skills, and tools across the org.",
      "Found a silent pagination bug truncating agent data, then shipped a reconciliation/soft-delete sync framework (deletions capped at 30% per run) keeping an 800+ agent catalog in sync.",
      "Audited the Glean agent catalog end-to-end, removing 670+ stale, orphaned, or duplicate agents (a 67% reduction) and authoring the governance strategy adopted afterwards.",
      "Led a competitive evaluation of 5+ AI/no-code platforms, producing a coverage matrix and executive report that informed platform investment.",
    ],
  },
  {
    code: "SM262",
    kind: "project",
    destination: "FASTAPI RAG",
    year: "2026",
    status: "in-air",
    when: "2026",
    title: "RAG over FastAPI, with a rigorous eval harness",
    stack: ["Python", "Qdrant", "OpenAI API", "Streamlit"],
    points: [
      "Cited Q&A over the FastAPI codebase and docs.",
      "Retrieval and generation are measured separately, so failures can be traced to a stage.",
      "The eval set is mined from real closed FastAPI GitHub issues instead of synthetic questions.",
      "Hallucination is scored per claim, and the LLM judge is validated against human labels.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/shaurmittal/rag-fastapi-eval" }],
  },
  {
    code: "SM251",
    kind: "project",
    destination: "PULSECHAT",
    year: "2025",
    status: "landed",
    when: "Oct 2025",
    title: "PulseChat: real-time messaging",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    points: [
      "Full-stack chat app with WebSocket messaging: private chats, live presence, persistent history.",
      "REST APIs and MongoDB schemas for users, conversations, and messages.",
      "Responsive React frontend with real-time updates.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/shaurmittal/PulseChat" },
      { label: "Live", href: "https://pulse-chat-backend.vercel.app" },
    ],
  },
  {
    code: "SM252",
    kind: "project",
    destination: "SKYLER · NGO APP",
    year: "2025",
    status: "landed",
    when: "Aug 2024 – Jul 2025",
    title: "Skyler: NGO volunteer platform",
    stack: ["Flutter", "Firebase", "Firestore"],
    points: [
      "Multi-organization platform for NGOs to manage volunteers, events, and donation drives; published on the App Store with 1000+ downloads across 8 partner NGOs.",
      "Architected Firestore data models and role-based authentication for NGOs, volunteers, and secure workflows.",
      "Built a gamification system (points, rewards, leaderboards) to incentivize participation and track engagement across donation drives.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/shaurmittal/Skyler-App" }],
  },
  {
    code: "SM241",
    kind: "experience",
    destination: "ARTESIAN · MOBILE",
    year: "2024",
    status: "landed",
    when: "Jun – Aug 2024",
    title: "Mobile App Development Intern",
    org: "Artesian Software Technologies · Mohali, India",
    stack: ["Swift", "Flutter"],
    points: [
      "Developed and optimized mobile app features in Swift and Flutter.",
      "Debugged issues and improved app performance with the engineering team.",
      "Evaluated mobile tools and frameworks for performance and maintainability.",
    ],
  },
  {
    code: "SM243",
    kind: "project",
    destination: "LLM FACT CHECK",
    year: "2024",
    status: "landed",
    when: "2024",
    title: "Factual Errors by LLMs",
    stack: ["Python"],
    points: ["A model that analyses factual errors made by large language models like ChatGPT."],
    links: [{ label: "GitHub", href: "https://github.com/shaurmittal/Factual-Errors-by-LLMs" }],
  },
];

export const about = {
  bio: [
    "I'm a Computer Science student at the University of Waterloo who likes building AI tools that hold up outside the demo.",
    "Most recently at Docebo, I shipped an agent feedback dashboard, a company-wide AI tools directory backed by an MCP server, and the sync jobs that keep an 800+ agent catalog accurate.",
    "Off duty, you'll find me on a soccer pitch or deep in a video game.",
  ],
  stats: [
    { label: "Based in", value: "Waterloo, ON" },
    { label: "Studying", value: "Honours CS, Co-op" },
    { label: "Last flight", value: "AI Solutions Eng @ Docebo" },
    { label: "Off duty", value: "Soccer · Video games" },
  ],
};

export type Destination = {
  code: string;
  city: string;
  country: string;
  when: string;
  icon: "home" | "school" | "work" | "event" | "pin";
  story: string;
  /** Optional photo, e.g. "/images/destinations/sf.jpg" (put the file in public/images/destinations) */
  image?: string;
  imageAlt?: string;
  /** Exactly one destination is the hub: every route starts there */
  hub?: boolean;
  /** Optional position override: angle in degrees (0 = right, 90 = up) and distance from the hub (0–1) */
  angle?: number;
  distance?: number;
};

// "Flights I've taken": everything flies out of the hub (Waterloo).
// To add a trip, add an entry below; the map places it automatically.
export const destinations: Destination[] = [
  {
    code: "YKF",
    city: "Waterloo",
    country: "Canada",
    when: "2025 – now",
    icon: "school",
    hub: true,
    story:
      "Home base. I'm studying Honours Computer Science (co-op) at the University of Waterloo, and every route on this map starts here.",
  },
  {
    code: "IXC",
    city: "Chandigarh",
    country: "India",
    when: "Hometown",
    icon: "home",
    story: "Where I grew up, and where this journey started before I flew out to Waterloo in 2025.",
  },
  {
    code: "IXC",
    city: "Mohali",
    country: "India",
    when: "Summer 2024",
    icon: "work",
    story:
      "My first internship: building and optimizing mobile app features in Swift and Flutter at Artesian Software Technologies.",
  },
  {
    code: "YYZ",
    city: "Toronto",
    country: "Canada",
    when: "Summer 2026",
    icon: "work",
    story:
      "AI Solutions Engineering intern at Docebo. I shipped an agent feedback dashboard, a company-wide AI tools directory backed by an MCP server, and the sync jobs that keep an 800+ agent catalog accurate.",
  },
  // Example of a new trip:
  // {
  //   code: "SFO",
  //   city: "San Francisco",
  //   country: "USA",
  //   when: "Oct 2026",
  //   icon: "event",
  //   story: "Flew out for Cal Hacks. ...",
  //   image: "/images/destinations/sf.jpg",
  //   imageAlt: "Our team at Cal Hacks",
  // },
];

export const skills: { belt: string; items: string[] }[] = [
  { belt: "Languages", items: ["Python", "JavaScript", "Java", "C", "SQL"] },
  { belt: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "LLM APIs", "RAG"] },
  { belt: "Cloud", items: ["AWS", "Firebase", "GitLab CI/CD", "Docker"] },
  { belt: "Databases", items: ["PostgreSQL", "MongoDB", "Firestore"] },
  { belt: "Tools", items: ["Git", "Figma", "LaTeX", "REST APIs"] },
];
