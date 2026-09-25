# Research Atlas Portfolio: Implementation Guide

## 1. Product Decision

Build the portfolio as a **living research atlas**: an interactive, editorial view of Anushka's work across problems, computational systems, and real-world contexts.

The site should answer five questions quickly:

1. What kinds of problems is Anushka interested in?
2. What systems has she built?
3. In what scientific, organisational, or international contexts did the work happen?
4. How does she reason about technical and research decisions?
5. What could someone collaborate with her on next?

The portfolio is **not** an AI showcase, a resume pasted into a website, a travel map, or a startup landing page.

### Core positioning

> I explore how computational systems can help us understand, support, and build things in the real world.

### Primary user groups

- Professors and researchers evaluating research fit
- Technical leads evaluating engineering depth
- Potential collaborators from other disciplines
- Recruiters or hiring managers who need a clear overview quickly

### Primary success criterion

A visitor should be able to understand the broader research identity in under one minute, then progressively explore technical depth without being forced through every detail.

---

## 2. Recommended Technology Stack

Use a hybrid static/content-driven architecture first. Add a Python service only when the user experience needs it.

### Frontend

- Next.js with App Router
- TypeScript
- Tailwind CSS
- MDX for long-form case studies and notes
- React Flow or D3 for the research atlas
- Motion library only for restrained transitions
- Lucide icons for interface controls

### Content and data

- MDX files for case studies, questions, and notes
- TypeScript data files for nodes, edges, filters, and metadata
- Zod for validating structured content
- No database in the first release

### Backend

- FastAPI in a separate `api/` directory
- Add it during the second release, not the first
- Initially use it for structured search and the "Explore my work" feature
- Keep the source of truth in repository content files

### Deployment

- Next.js frontend on Vercel
- FastAPI service on Google Cloud Run, Render, or Fly.io when needed
- Keep the site usable if the API is unavailable

### Suggested repository structure

```text
portfolio/
├── app/
│   ├── atlas/
│   ├── collaborate/
│   ├── notes/
│   ├── questions/
│   ├── work/
│   │   └── [slug]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atlas/
│   ├── case-study/
│   ├── content/
│   └── ui/
├── content/
│   ├── projects/
│   ├── questions/
│   └── notes/
├── data/
│   ├── atlas.ts
│   ├── contexts.ts
│   └── navigation.ts
├── lib/
│   ├── content.ts
│   ├── metadata.ts
│   └── validation.ts
├── public/
│   ├── images/
│   └── diagrams/
├── api/
│   └── README.md
├── IMPLEMENTATION_GUIDE.md
├── package.json
└── README.md
```

---

## 3. Product Principles

These principles should guide every design and implementation decision.

### Problem before technology

Every project begins with the situation, people, constraints, and question. The technology comes after that context.

### Systems before isolated components

Show how models, interfaces, infrastructure, people, and workflows interact. Never present a model as the entire solution when it was only one component.

### Progressive disclosure

Support several reading depths:

- Level 1: identity and problem
- Level 2: system overview
- Level 3: contribution and technical decisions
- Level 4: tradeoffs, limitations, and failures
- Level 5: implementation or research detail

### Honest scope

Distinguish clearly between:

- work completed
- work contributed to as part of a team
- experiments
- current interests
- open questions

### Context is evidence

International experience should explain how the environment shaped the work. Do not use countries as decoration.

### The site demonstrates engineering through restraint

Use interactive features only when they improve understanding. A simple, reliable interaction is more valuable than a complex feature added for novelty.

---

## 4. Staged Implementation Plan

## Stage 0: Confirm the source material

**Goal:** Create a trustworthy content inventory before designing pages.

### Tasks

- Collect the current CV, project descriptions, publications, technical notes, and links.
- Confirm the exact names, dates, locations, organisations, and contribution boundaries for each project.
- Separate public information from confidential work details.
- Identify images, diagrams, repositories, papers, and demos that can be published.
- Mark uncertain facts as `needs-review` rather than guessing.

### Initial content inventory

Create a table with these columns:

| Field | Purpose |
|---|---|
| Project | Public project name |
| Problem | What situation motivated the work |
| Context | Organisation, domain, country, or research setting |
| Contribution | What Anushka personally did |
| System | Main components and relationships |
| Outcome | Result, status, or evidence |
| Limitation | What did not work or remains constrained |
| Open question | What the work made worth investigating next |
| Links | Public supporting material |
| Visibility | Public, partial, or private |

### Exit criteria

- Every public project has an owner-approved summary.
- No project claims are based on assumptions.
- Confidential material has been removed or abstracted.
- The content inventory is more complete than the first UI mockup.

---

## Stage 1: Establish the visual and content system

**Goal:** Define the design language before building individual pages.

### Visual direction

Use a technical editorial style:

- warm off-white background
- charcoal text
- one primary accent, such as vermilion or cobalt
- thin rules and grid lines
- compact metadata labels
- generous whitespace
- precise diagrams
- minimal rounded containers
- restrained motion

Avoid purple gradients, glowing neural networks, robot imagery, excessive glassmorphism, and generic dashboard styling.

### Typography

Choose one expressive display face and one highly legible text face. Confirm that both have the required weights and support all published characters.

Recommended starting approach:

- Display: a distinctive editorial serif or humanist grotesk
- Body: a readable sans-serif with strong numerals and technical punctuation
- Metadata: the body face with increased tracking, never tiny enough to become inaccessible

### Design tokens

Define tokens for:

- background and surface colours
- text hierarchy
- accent and status colours
- border colours
- spacing scale
- content widths
- diagram line weights
- animation durations
- focus states

### Exit criteria

- Typography, colour, spacing, and component rules are documented.
- The visual system works in a single-column mobile layout and a wide desktop layout.
- A visitor can identify hierarchy without relying on animation.

---

## Stage 2: Build the content model

**Goal:** Make the site content structured, reusable, and easy to expand.

### Project frontmatter

Each project should include fields similar to:

```yaml
slug: gofer
name: Gofer
shortTitle: Accessible scientific infrastructure
category: scientific-computing
status: selected-work
contexts:
  - CERN
  - Switzerland
systems:
  - infrastructure
  - software
  - optimisation
technologies:
  - Go
  - FastAPI
  - FPGA synthesis
featured: true
order: 1
```

### Required project sections

Every major case study should support:

1. The problem
2. Context and stakeholders
3. The original workflow
4. System design
5. Personal contribution
6. Technical decisions
7. Tradeoffs and constraints
8. Outcome and evidence
9. What was learned
10. Open questions
11. Further technical detail
12. Links and references

### Research question model

Each question should contain:

- a short title
- the question itself
- why it matters
- related systems or projects
- current confidence level
- what remains unknown

### Atlas node model

```ts
type AtlasNode = {
  id: string;
  label: string;
  kind: "problem" | "system" | "context" | "project" | "question";
  description: string;
  relatedSlugs: string[];
};
```

Edges should represent meaningful relationships, such as `informs`, `implemented-in`, `constrained-by`, or `raises-question-about`, rather than decorative connections.

### Exit criteria

- Content can be rendered without hardcoding project text into UI components.
- Invalid frontmatter produces a clear build error.
- A new project can be added without changing the page implementation.

---

## Stage 3: Create the information architecture

**Goal:** Give visitors a coherent route through the work.

### Primary navigation

```text
Atlas    Work    Questions    Notes    Collaborate
```

### Page responsibilities

#### Atlas

The primary entry point. Shows the research map and lets visitors filter by problem, system, context, or project.

#### Work

A searchable index of case studies. Provide filters, but make the default ordering narrative rather than purely chronological.

#### Work detail

A complete case study with progressive disclosure. Start with the problem and context, then reveal architecture and technical depth.

#### Questions

An exploratory set of research directions. These are questions, not claims of universal expertise.

#### Notes

Short experiments, observations, technical notes, and unfinished thinking. Label their status honestly.

#### Collaborate

Explain what Anushka can contribute, what she wants to explore, and how to start a conversation.

### Exit criteria

- A visitor can reach any major project within two interactions from the homepage.
- Each page has a clear next action.
- Navigation remains understandable without JavaScript-specific knowledge.

---

## Stage 4: Build the homepage and atlas

**Goal:** Make the central concept visible immediately.

### Homepage sequence

1. Name and concise positioning statement
2. One-sentence explanation of the atlas
3. Interactive atlas
4. Featured case studies
5. Research questions
6. Short trajectory/context section
7. Collaboration invitation

### Atlas behaviour

On desktop:

- show a connected map in the main content area
- keep labels readable at normal zoom
- use hover only as a supplement
- use click to select a node
- show related projects and questions beside or below the map

On mobile:

- replace the dense graph with a vertically ordered list or horizontal scroll map
- retain the same node relationships in an accessible form
- never make the graph the only way to access content

### Interaction states

Design all of these explicitly:

- initial state
- node hover
- node selected
- filtered state
- no matching results
- keyboard focus
- reduced motion
- loading or hydration fallback
- API unavailable state, if API features have been added

### Exit criteria

- The homepage communicates the broader identity without requiring a click.
- The atlas works with keyboard navigation and touch.
- Every atlas relationship has a corresponding content destination.
- The page remains useful if the visual graph fails to render.

---

## Stage 5: Build case-study pages

**Goal:** Demonstrate research and engineering depth without overwhelming the reader.

### Recommended case-study layout

```text
Project title and one-line premise
Context metadata
Problem
Original workflow
System overview
Interactive architecture
My contribution
Technical decisions
Tradeoffs and limitations
Outcome
What I learned
Open questions
Technical appendix
Related work
```

### Project-specific emphasis

#### CERN / Gofer

Frame the case study around making specialised scientific infrastructure accessible without requiring every researcher to manage complex toolchains.

Show:

- original synthesis workflow
- scheduling and build lifecycle
- quotas and RBAC
- API, client, and UI
- underlying synthesis tooling
- architecture and operational constraints

#### EBRD / knowledge systems

Frame it around integrating intelligent information systems into organisational workflows.

Show the complete flow:

```text
User -> Query -> Retrieval -> Search/Reranking -> Context -> Model -> Response -> Workflow
```

Explain why each component existed and how organisational constraints affected the design.

#### MoQi

Frame it around computational support for collective decision-making and information aggregation.

Show:

- multiple sources and perspectives
- aggregation and weighting
- reasoning and explainability
- the boundary between system output and human judgement

#### Research projects

Group by problem or domain, not only by model architecture:

- medical and biological applications
- computer vision
- language and safety
- decision systems
- other computational experiments

Use the pattern:

```text
Question -> Method -> Experiment -> Result -> Limitation -> Next question
```

### Exit criteria

- A professor can understand the research question without reading the technical appendix.
- An engineer can reach architecture, decisions, and limitations quickly.
- Contribution boundaries are explicit.
- Open questions appear on every major case study.

---

## Stage 6: Add context and trajectory

**Goal:** Integrate international experience as meaningful evidence.

### Context design

Use context metadata on project pages:

- country or region
- organisation or institution
- domain
- stakeholder environment
- project period
- constraints that shaped the work

### Trajectory view

Create a compact timeline that connects contexts to questions and systems. Do not turn it into a travel map.

For example:

```text
Context -> Problem encountered -> System built -> Question carried forward
```

A country should only appear when it helps explain the work.

### Exit criteria

- International experience is visible from the homepage or atlas.
- It is connected to design decisions and working contexts.
- The site does not imply that geography itself is the achievement.

---

## Stage 7: Add search and "Explore my work"

**Goal:** Make the structured content genuinely useful without making the site depend on an AI assistant.

### First version: deterministic exploration

Before adding an LLM, implement:

- full-text search
- filters by system, domain, context, and question
- related-content links
- example prompts that map to structured filters

Example queries:

- Show projects involving scientific computing.
- What work involved human decision-making?
- Which projects involved infrastructure?
- Show examples of ML outside pure AI research.

### FastAPI endpoints

```text
GET /health
GET /projects
GET /projects/{slug}
GET /search?q=...
GET /filters
```

The API should return only content present in the repository knowledge base.

### Later retrieval layer

Only add semantic retrieval when keyword search becomes insufficient.

Possible later stack:

- Python text processing
- embeddings generated from approved content
- pgvector or a small local vector index
- citations linking every result back to a project or note

The assistant must:

- distinguish known content from inference
- refuse to invent projects, skills, or outcomes
- link answers to source pages
- state when no evidence exists

### Exit criteria

- Search works without an LLM.
- Results are explainable and linked to source content.
- The site remains usable if the Python API is down.
- No private or unverified material is indexed.

---

## Stage 8: Accessibility, performance, and quality

**Goal:** Make the ambitious concept dependable.

### Accessibility

- semantic headings and landmarks
- visible keyboard focus
- keyboard-accessible atlas nodes
- text alternative for every diagram
- reduced-motion support
- sufficient colour contrast
- no information conveyed by colour alone
- readable mobile typography
- accessible expandable sections

### Performance

- render content statically where possible
- optimise images and diagrams
- lazy-load the interactive atlas if it is not needed for the first paint
- avoid shipping a large visualisation library to every route
- keep the homepage functional before client-side hydration

### Testing

Add tests for:

- content schema validation
- project and filter queries
- route generation
- search results
- atlas relationships
- keyboard access to interactive nodes
- mobile layout at narrow widths
- reduced-motion behaviour

Run these checks before each release:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

If the API exists:

```text
pytest
```

### Exit criteria

- No known keyboard trap exists.
- The build fails on malformed content.
- Static pages still render with the API unavailable.
- The atlas has a non-visual fallback.

---

## Stage 9: Deployment and maintenance

**Goal:** Make publishing new work straightforward and safe.

### Deployment sequence

1. Push the Next.js frontend to the main branch.
2. Configure preview deployments for pull requests.
3. Add the FastAPI service only after the static site is stable.
4. Store secrets outside the repository.
5. Add a health check and basic request logging to the API.
6. Verify the production build on desktop and mobile.

### Content workflow

For every new project or note:

1. Add structured metadata.
2. Write the problem and context before the technology section.
3. State contribution boundaries.
4. Add evidence, limitations, and an open question.
5. Run schema validation and the full build.
6. Review the page as a researcher, engineer, and external collaborator.

### Maintenance rules

- Keep the repository content as the source of truth.
- Review external links periodically.
- Mark outdated work rather than silently rewriting history.
- Add new nodes only when they represent a meaningful concept.
- Prefer a small number of strong case studies over a large project inventory.

---

## 5. Release Plan

### Release 1: The clear foundation

Include:

- homepage positioning
- static atlas with accessible fallback
- three to four project case studies
- questions page
- collaboration page
- responsive design
- MDX content model

Do not include:

- chatbot
- database
- complex authentication
- elaborate 3D graphics
- speculative claims

### Release 2: The useful atlas

Add:

- interactive filters
- contextual timeline
- related projects and questions
- notes section
- deterministic search
- richer architecture diagrams

### Release 3: The intelligent layer

Add only if the content supports it:

- FastAPI service
- structured exploration endpoints
- semantic retrieval
- source-linked answers
- analytics for failed searches and unclear navigation

---

## 6. Definition of Done

The portfolio is ready for its first public release when:

- The homepage clearly communicates researcher, engineer, and interdisciplinary systems thinker.
- AI/ML is visible but is not the organising identity.
- Visitors can explore by problem, system, question, project, and context.
- At least three case studies explain context, architecture, contribution, tradeoffs, and open questions.
- International experience is connected to real working contexts rather than shown as decoration.
- Every interactive visual has an accessible textual path.
- The site works on mobile, keyboard, and reduced-motion settings.
- The build is reproducible and content can be updated without rewriting components.
- The site remains useful without an AI assistant.
- All factual claims and project details have been reviewed by Anushka.

## Final product statement

> A living research atlas of computational systems, built across scientific, organisational, and human contexts, and shaped by the questions that remain open.
