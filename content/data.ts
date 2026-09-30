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
    devpost: "https://devpost.com/shaurmittal",
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
      "Built a full-stack agent feedback dashboard (React, Glean OAuth, AWS CloudWatch/S3/Athena) giving agent owners role-scoped, self-service access to user feedback, replacing manual data pulls by AI Operations.",
      "Engineered a company-wide AI portal (Next.js, MCP server, GitLab-backed) serving 900+ employees as a single hub for AI guides, the full agent catalog with Glean source links, and self-service skill and agent registration.",
      "Diagnosed a silent pagination bug truncating Glean API data, then shipped a reconciliation/soft-delete sync framework (capped at 30% deletions per run) that keeps an 800+ agent catalog in sync automatically.",
      "Audited the Glean agent catalog end-to-end, removing 670+ stale, orphaned, or duplicate agents (a 67% reduction), and authored the lifecycle/governance strategy adopted for ongoing catalog hygiene.",
      "Led a competitive evaluation of 5+ AI/no-code platforms, producing a coverage matrix and executive report that informed platform investment.",
    ],
  },
  {
    code: "SM262",
    kind: "project",
    destination: "FASTAPI RAG",
    year: "2026",
    status: "landed",
    when: "Sep 2026",
    title: "FastAPI RAG Q&A Engine",
    stack: ["Python", "Claude API", "Qdrant", "Streamlit", "Docker"],
    points: [
      "Built a cited-answer RAG system over FastAPI's docs and source code using Qdrant, local bge-small embeddings, a cross-encoder reranker, and Claude with native citations, deployed as a Streamlit demo.",
      "Ran a 4-configuration ablation (chunking strategy × reranking) on 51 questions mined from 613 closed GitHub issues; paired bootstrap CIs showed reranking cost ~15× latency for no significant gain.",
      "Found that a pooled, TREC-style relevance review recovered 28 correct answers the first-pass labels missed, raising hit@5 by ~0.10, a larger effect than any pipeline change.",
      "Built an LLM-as-judge pipeline scoring claim-level faithfulness, correctness, and citation precision, validated against an independent rater (κ\u00a0=\u00a00.89), grading 204 answers for $9 via the Message Batches API.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/shaurmittal/rag-fastapi-eval" },
      { label: "Demo", href: "https://rag-fastapi-eval-ucfzndxrqengdrxwzmgny3.streamlit.app/" },
    ],
  },
  {
    code: "SM263",
    kind: "project",
    destination: "HOOKFUZZ",
    year: "2026",
    status: "landed",
    when: "Sep 2026",
    title: "hookfuzz: chaos testing CLI for payment webhooks",
    stack: ["Go", "Node.js", "Express", "Stripe API"],
    points: [
      "Built a Go CLI that finds bugs in Stripe webhook handlers by delivering signed events twice, out of order, late, or after failures, then checking user-defined correctness rules against the app's final state.",
      "Implemented delta-debugging test shrinking with seeded, reproducible runs, reducing a 44-event failing delivery sequence to a minimal 2-event reproduction that replays exactly from a single seed.",
      "Validated the tool against a sample Express shop with 3 planted bugs (duplicate fulfillment, dropped refund, stale subscription overwrite): it caught all 3, with zero false positives over 200 seeds on the fixed version.",
      "Designed fail-safe checks so that misconfigurations such as a wrong signing secret or a mistyped rule stop with an error instead of reporting a false pass.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/shaurmittal/hookfuzz" }],
  },
  {
    code: "SM264",
    kind: "project",
    destination: "VERTE",
    year: "2026",
    status: "landed",
    when: "Sep 2026 · PivotHacks 2026",
    title: "Verte: sustainable shopping Chrome extension",
    stack: ["TypeScript", "React", "Node.js", "OpenAI API", "Snowflake"],
    points: [
      "Won 2nd place in the Pivot Track at PivotHacks 2026 with a team of 4, building a Manifest V3 Chrome extension that injects secondhand and lower-carbon alternatives inline on Amazon.ca and Best Buy product pages.",
      "Built a Node.js proxy using the OpenAI API to classify products and recommend alternatives, verifying every suggestion against live Amazon.ca listings to filter out hallucinated or discontinued items.",
      "Integrated a Snowflake knowledge base of cited embodied-carbon estimates and added voice search via OpenAI transcription with silence detection, persisting budget and location context across queries.",
    ],
    links: [{ label: "Devpost", href: "https://devpost.com/software/verte-niek4b" }],
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
];

export const about = {
  bio: [
    "I'm an Honours Computer Science co-op student at the University of Waterloo. What interests me about AI systems is the part that determines whether they hold up outside a demo: evaluation, data integrity, and the tooling that lets other people build on your work.",
    "That thread runs through a retrieval engine I benchmarked against real developer questions rather than synthetic ones, internal AI agent platforms and governance work at Docebo, and real-time full-stack applications built on WebSockets and REST. I work mainly in Python and JavaScript, across AWS, Docker, PostgreSQL, and modern web frameworks.",
    "Outside of work I love to spend time on the field playing Soccer or refreshing my mind with some video games. I also have an active interest in travelling, and I'm always planning the next trip.",
  ],
  // Seatback screen next to the bio. icon: "soccer" | "gaming" | "music" | "film" | "travel" (drawn in components/Icons.tsx)
  entertainment: [
    { icon: "gaming", category: "Now playing", title: "Valorant", note: "Tactical shooter · PC" },
    { icon: "soccer", category: "Supporting", title: "FC Barcelona", note: "LaLiga" },
    { icon: "film", category: "Watching", title: "Outer Banks", note: "Netflix" },
    { icon: "music", category: "On repeat", title: "Noble", note: "The Kid LAROI" },
    { icon: "travel", category: "Next destination", title: "New York", note: "USA" },
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
  { belt: "Languages", items: ["Python", "TypeScript", "JavaScript", "Go", "Java", "C", "SQL"] },
  { belt: "AI & LLMs", items: ["Claude API", "OpenAI API", "RAG pipelines", "LLM evaluation", "Qdrant", "MCP"] },
  { belt: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "Streamlit"] },
  { belt: "Cloud & Data", items: ["AWS", "Snowflake", "PostgreSQL", "MongoDB", "Firestore", "Firebase"] },
  { belt: "Tools", items: ["Git", "Docker", "GitLab CI/CD", "REST APIs", "Stripe API", "Chrome Extensions"] },
];
