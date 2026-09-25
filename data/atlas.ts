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

export const portfolioContent = {
  atlasNodes,
  atlasEdges,
  projects: featuredProjects,
  questions: researchQuestions,
};
