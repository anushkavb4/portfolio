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

export type ProjectSection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
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
  caseStudy: ProjectSection[];
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

export type ProjectNoteSection = {
  title: string;
  body: string;
};

export type ProjectNote = {
  slug: string;
  title: string;
  status: "draft" | "exploration" | "published";
  summary: string;
  relatedProject: string;
  sections: ProjectNoteSection[];
};

export type ContextTrajectory = {
  step: string;
  context: string;
  question: string;
  outcome: string;
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
    caseStudy: [
      { eyebrow: "Problem", title: "The decision was larger than the model", body: "The work began with a practical question: how can a team make better decisions when evidence is incomplete, time is limited, and trade-offs are distributed across stakeholders? The system had to support judgement without pretending uncertainty had disappeared." },
      { eyebrow: "Context", title: "Designed around situated work", body: "The setting combined research, operational pressure, and cross-disciplinary collaboration. Stakeholders needed a shared view of evidence and constraints, but could not pause their work to maintain a perfect data model." },
      { eyebrow: "Workflow", title: "From manual interpretation to shared pathways", body: "The original workflow relied on expert judgement, manual analysis, and iterative feedback. The design goal was to reduce avoidable friction while preserving the context that made each decision meaningful." },
      { eyebrow: "System", title: "A layered decision-support system", body: "The system brought together data workflows, service interfaces, and operational conventions. Each layer made a different part of the decision visible, from incoming evidence to the actions available to a team." },
      { eyebrow: "Contribution", title: "Structuring the problem and the handoffs", body: "My contribution focused on clarifying user constraints, shaping the system boundaries, and making the relationship between evidence, recommendation, and human action easier to inspect." },
      { eyebrow: "Decisions", title: "Legibility over novelty", body: "Technical choices prioritised transparency, iteration, and practical fit. A smaller explainable workflow was more valuable than a more sophisticated system that stakeholders could not confidently interrogate." },
      { eyebrow: "Trade-offs", title: "Useful without over-automating", body: "The system remained constrained by partial information, uncertain adoption, and the limits of generalising from a situated context.", bullets: ["Recommendations remain dependent on the quality and timeliness of evidence.", "Human review is still necessary when constraints change quickly."] },
      { eyebrow: "Learning", title: "The system follows the decision context", body: "The strongest design decisions came from understanding how decisions were actually made, not from starting with a model or a preferred implementation pattern." },
      { eyebrow: "Open question", title: "When does support become dependency?", body: "Further work should test which signals improve trust and decision quality, and which only create the appearance of certainty." },
    ],
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
    caseStudy: [
      { eyebrow: "Problem", title: "Unfamiliar systems create hidden costs", body: "People often struggle not because a system lacks capability, but because its concepts, boundaries, and failure modes are difficult to see. The question was how an interface could help people build a reliable mental model." },
      { eyebrow: "Context", title: "Shared understanding across disciplines", body: "The work sat inside cross-disciplinary collaboration where different people brought different vocabularies, assumptions, and levels of technical confidence." },
      { eyebrow: "System", title: "Interfaces as reasoning infrastructure", body: "The interface treated explanation, status, and relationships as part of the system rather than decorative layers added after implementation." },
      { eyebrow: "Contribution", title: "Making the hidden workflow visible", body: "My contribution focused on translating uncertain system behaviour into interaction patterns that supported inspection, comparison, and collaborative reasoning." },
      { eyebrow: "Decisions", title: "Expose the right complexity", body: "The design avoided both total abstraction and an unfiltered technical dump. It surfaced the information needed for the next decision, with deeper detail available when someone needed to investigate." },
      { eyebrow: "Trade-offs", title: "Clarity is contextual", body: "An explanation that helps one audience can overwhelm another. The interface therefore had to support multiple reading depths without implying that a simplified view was the whole system." },
      { eyebrow: "Learning", title: "Trust needs visible boundaries", body: "People are better able to evaluate a system when they can see what it knows, what it assumes, and where human judgement still matters." },
      { eyebrow: "Open question", title: "How much explanation is enough?", body: "The next question is how to measure whether explanation improves decisions rather than simply increasing the amount of information on screen." },
    ],
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
    caseStudy: [
      { eyebrow: "Problem", title: "Experiments needed a path into practice", body: "Research and delivery work can lose momentum between an interesting experiment and a repeatable workflow. The problem was to make handoffs, quality checks, and operational state easier to understand." },
      { eyebrow: "Context", title: "Infrastructure shaped the available work", body: "The setting included research institutions and product teams with different rhythms, responsibilities, and tolerance for process overhead. The system needed to support consistency without becoming a burden." },
      { eyebrow: "Workflow", title: "From implicit process to visible stages", body: "The work mapped the moments where information was lost: between experiments, reviews, implementation, and release. These stages became explicit enough to discuss and improve." },
      { eyebrow: "System", title: "Tooling, checks, and shared state", body: "The toolkit combined workflow design, platform engineering, and quality assurance so teams could see what had happened, what was blocked, and what needed attention next." },
      { eyebrow: "Contribution", title: "Connecting process to technical structure", body: "My contribution focused on shaping the operating model and translating it into maintainable tooling, with attention to the human decisions that automation should leave intact." },
      { eyebrow: "Trade-offs", title: "Repeatability without rigidity", body: "More structure can improve reliability, but too much structure can prevent a team from responding to a new research question. The design kept exceptions visible rather than forcing every project into one template." },
      { eyebrow: "Outcome", title: "A clearer path from experiment to practice", body: "The result was better visibility into process structure, handoffs, and decision quality, while keeping the human layer responsible for interpretation and judgement." },
      { eyebrow: "Open question", title: "Which constraints should become defaults?", body: "Future work should identify the small number of conventions that create the most reliability without turning a living research process into a rigid production line." },
    ],
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
    sections: [
      {
        title: "Why trust becomes a design problem",
        body: "Trust is rarely a single design decision. It emerges from the way information is framed, how uncertainty is communicated, and whether people can understand the system's boundaries. In many technical environments, the most damaging failure is not incorrect output but convincing output that cannot be interrogated.",
      },
      {
        title: "What makes an interface legible",
        body: "A useful interface gives people enough visibility to understand what the system is doing, what it is not doing, and what evidence it is using. This often matters more than a polished visual layer. Legibility supports critical evaluation rather than blind adoption.",
      },
      {
        title: "What I keep returning to",
        body: "The strongest systems are not the ones that hide complexity but the ones that expose the right parts of it at the right time. Good interfaces should help people reason, not just consume or approve a recommendation.",
      },
    ],
  },
  {
    slug: "systems-as-constraints",
    title: "Systems as constraints",
    status: "exploration",
    summary: "A working note on how infrastructure choices shape the actions available to a team.",
    relatedProject: "research-operations",
    sections: [
      {
        title: "The system shapes the workflow",
        body: "Operational systems often feel like neutral infrastructure, but they are never neutral. Each tool, policy, API, and queue creates a set of permitted actions and a set of invisible costs. The design problem is not only capability, but also the behaviour that becomes normalised.",
      },
      {
        title: "The practical consequence",
        body: "When infrastructure is poorly designed, teams compensate in ad hoc ways. The result is not just slower work, but a drift in standards, increased friction, and a weaker connection between the decision being made and the evidence behind it.",
      },
      {
        title: "Open question",
        body: "How do we create systems that preserve flexibility without allowing complexity to become unmanageable? The answer likely lies in designing around constraints that are visible, explicit, and aligned with the actual work being done.",
      },
    ],
  },
];

export const contextTrajectory: ContextTrajectory[] = [
  {
    step: "Context",
    context: "Cross-disciplinary research and applied engineering",
    question: "How do technical systems support decisions when the environment is uncertain?",
    outcome: "Designing tools and interfaces that make complexity more legible rather than more opaque.",
  },
  {
    step: "System",
    context: "Operational tooling and decision-support workflows",
    question: "What kinds of infrastructure create trust, speed, and shared understanding?",
    outcome: "Building systems that align human judgment with process structure and evidence.",
  },
  {
    step: "Question",
    context: "Research directions that remain open",
    question: "Which interventions genuinely improve decision quality, and which only imitate it?",
    outcome: "Returning to the boundary between automation, interpretation, and human agency.",
  },
];

export const portfolioContent = {
  atlasNodes,
  atlasEdges,
  projects: featuredProjects,
  questions: researchQuestions,
  notes,
  contextTrajectory,
};
