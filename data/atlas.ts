export type AtlasNode = {
  id: string;
  label: string;
  kind: "problem" | "system" | "context" | "project" | "question";
  description: string;
  relatedSlugs: string[];
};

export type AtlasEdge = {
  id: string;
  source: string;
  target: string;
  type: "informs" | "implemented-in" | "constrained-by" | "raises-question-about";
};

export type PortfolioProject = {
  slug: string;
  name: string;
  shortTitle: string;
  category: string;
  status: "selected-work" | "current-work" | "experimental" | "archive";
  contexts: string[];
  systems: string[];
  technologies: string[];
  summary: string;
  outcome: string;
  links: { label: string; url: string }[];
  featured: boolean;
  order: number;
};

export type ResearchQuestion = {
  slug: string;
  title: string;
  question: string;
  whyItMatters: string;
  relatedSystems: string[];
  confidence: "low" | "medium" | "high";
  unknowns: string[];
};

export type ProjectNote = {
  slug: string;
  title: string;
  status: "draft" | "exploration" | "published";
  summary: string;
  relatedProject: string;
};

export const atlasNodes: AtlasNode[] = [
  {
    id: "problem-understanding",
    label: "Problem understanding",
    kind: "problem",
    description: "Understanding complex real-world needs before choosing a technical intervention.",
    relatedSlugs: ["atlas", "context-aware-systems"],
  },
  {
    id: "computational-systems",
    label: "Computational systems",
    kind: "system",
    description: "Interfaces, models, and infrastructure that shape decision-making.",
    relatedSlugs: ["computational-interfaces", "research-operations"],
  },
  {
    id: "field-context",
    label: "Field context",
    kind: "context",
    description: "Organisational, scientific, and international settings that constrain the work.",
    relatedSlugs: ["public-interest-technology", "cross-disciplinary-research"],
  },
  {
    id: "research-translation",
    label: "Research translation",
    kind: "project",
    description: "Bringing insight from experimentation toward usable systems and practice.",
    relatedSlugs: ["decision-support", "knowledge-interfaces"],
  },
  {
    id: "design-questions",
    label: "Design questions",
    kind: "question",
    description: "Open questions that remain worth investigating with more evidence and iteration.",
    relatedSlugs: ["systems-for-uncertainty", "human-in-the-loop"],
  },
];

export const atlasEdges: AtlasEdge[] = [
  { id: "e1", source: "problem-understanding", target: "computational-systems", type: "informs" },
  { id: "e2", source: "field-context", target: "computational-systems", type: "constrained-by" },
  { id: "e3", source: "computational-systems", target: "research-translation", type: "implemented-in" },
  { id: "e4", source: "research-translation", target: "design-questions", type: "raises-question-about" },
];

export const featuredProjects: PortfolioProject[] = [
  {
    slug: "decision-support",
    name: "Decision support systems",
    shortTitle: "Operational research for complex, time-sensitive decisions",
    category: "decision-systems",
    status: "selected-work",
    contexts: ["Research labs", "International teams", "Public-sector settings"],
    systems: ["infrastructure", "software", "data workflows"],
    technologies: ["Python", "FastAPI", "visualisation"],
    summary:
      "A decision-support effort focused on making operational choices more legible, explainable, and responsive to real-world uncertainty.",
    outcome:
      "Created more transparent operational workflows and clearer decision pathways across teams working under non-trivial constraints.",
    links: [
      { label: "Case study", url: "/work/decision-support" },
      { label: "Repository", url: "https://github.com" },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "knowledge-interfaces",
    name: "Knowledge interfaces",
    shortTitle: "Interfaces that help people reason with unfamiliar systems",
    category: "human-computer-interaction",
    status: "selected-work",
    contexts: ["Cross-disciplinary collaboration", "Academic research"],
    systems: ["interfaces", "models", "human factors"],
    technologies: ["TypeScript", "React", "Design systems"],
    summary:
      "Explored how people navigate unfamiliar technical systems when the underlying model is uncertain or opaque.",
    outcome:
      "Produced interface patterns that improved interpretability, idea flow, and collaborative reasoning in technical environments.",
    links: [
      { label: "Case study", url: "/work/knowledge-interfaces" },
      { label: "Research note", url: "/notes/designing-trustworthy-interfaces" },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "research-operations",
    name: "Research operations",
    shortTitle: "Operational tooling across research and delivery pipelines",
    category: "research-operations",
    status: "current-work",
    contexts: ["Research institutions", "Product teams"],
    systems: ["workflow design", "platform engineering", "quality assurance"],
    technologies: ["Next.js", "Python", "automation"],
    summary:
      "A systems-focused operational toolkit intended to help research and delivery teams move from experimentation to repeatable practice.",
    outcome:
      "Improved visibility into process structure, handoffs, and decision quality without over-automating the human layer.",
    links: [
      { label: "Case study", url: "/work/research-operations" },
      { label: "Note", url: "/notes/systems-as-constraints" },
    ],
    featured: false,
    order: 3,
  },
];

export const researchQuestions: ResearchQuestion[] = [
  {
    slug: "systems-for-uncertainty",
    title: "How do systems support uncertain decisions?",
    question: "How can computational systems help people act under incomplete information without creating false confidence?",
    whyItMatters: "Real decisions often happen under incomplete evidence, competing constraints, and evolving assumptions.",
    relatedSystems: ["decision-support", "knowledge-interfaces"],
    confidence: "medium",
    unknowns: ["When automation improves trust versus creates dependency"],
  },
  {
    slug: "human-in-the-loop",
    title: "What does a useful human-in-the-loop system look like?",
    question: "Which parts of the workflow should remain human-led, and which should be automated or delegated?",
    whyItMatters: "The strongest systems often depend on careful boundaries between machine recommendations and human judgment.",
    relatedSystems: ["research-operations", "decision-support"],
    confidence: "medium",
    unknowns: ["Which signals are most robust for meaningful intervention"],
  },
];

export const notes: ProjectNote[] = [
  {
    slug: "designing-trustworthy-interfaces",
    title: "Designing trustworthy interfaces",
    status: "published",
    summary: "Early notes on how explanation, visibility, and trust interact in operational systems.",
    relatedProject: "knowledge-interfaces",
  },
  {
    slug: "systems-as-constraints",
    title: "Systems as constraints",
    status: "exploration",
    summary: "A working note on how infrastructure choices shape the actions available to a team.",
    relatedProject: "research-operations",
  },
];

export const portfolioContent = {
  atlasNodes,
  atlasEdges,
  projects: featuredProjects,
  questions: researchQuestions,
  notes,
};
