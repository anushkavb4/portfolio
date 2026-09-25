import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/content/SectionBlock";
import { featuredProjects } from "@/data/atlas";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const projectStory = {
    problem: "The work began with a real operational question: how can a team make better decisions when evidence is incomplete, time is limited, and trade-offs are distributed across multiple stakeholders?",
    context: "This work was shaped by cross-disciplinary collaboration, time-sensitive research settings, and the practical need to align technical decisions with real-world constraints.",
    workflow: "The original workflow depended on a mix of expert judgement, manual analysis, and iterative feedback loops. The goal was to reduce friction without removing the human context that made the decisions meaningful.",
    system: "The system combined interfaces, infrastructure, and operational decisions into a single working model so the team could test ideas quickly and communicate trade-offs clearly.",
    contribution: "The contribution focused on structuring the problem, clarifying user constraints, and shaping the underlying system design so it could support decisions instead of merely automate tasks.",
    decisions: "The design prioritised legibility, transparency, and practical fit over novelty. Technical choices were selected to support explanation and iteration rather than adding complexity for its own sake.",
    tradeoffs: "Some important constraints remained: partial information, uncertain user adoption, and the limits of designing a general solution for a highly situated context.",
    outcome: "The outcome was a clearer decision path and stronger alignment across teams, even as the work remained open to further refinement and broader deployment.",
    learning: "The main lesson was that systems are strongest when they are designed around the decision-making context, not just the data or the model.",
    questions: "What happens when decision support becomes embedded in real operational routines? Which signals truly improve trust, and which only create the appearance of certainty?",
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Work detail</span>
          <span className="brand-name">{project.name}</span>
        </div>
      </header>

      <section className="section">
        <div className="collab-panel" style={{ display: "grid", gap: "1rem" }}>
          <p className="kicker" style={{ margin: 0 }}>{project.category}</p>
          <h1 style={{ margin: 0 }}>{project.shortTitle}</h1>
          <p>
            <strong>Context:</strong> {project.contexts.join(" · ")}
          </p>
          <p>
            <strong>Systems:</strong> {project.systems.join(" · ")}
          </p>
          <p>
            <strong>Technologies:</strong> {project.technologies.join(" · ")}
          </p>
          <Link href="/work" className="secondary-button">
            Back to work
          </Link>
        </div>

        <SectionBlock eyebrow="Problem" title="The problem" body={projectStory.problem} />
        <SectionBlock eyebrow="Context" title="Context and stakeholders" body={projectStory.context} />
        <SectionBlock eyebrow="Workflow" title="Original workflow" body={projectStory.workflow} />
        <SectionBlock eyebrow="System" title="System design" body={projectStory.system} />
        <SectionBlock eyebrow="Contribution" title="Personal contribution" body={projectStory.contribution} />
        <SectionBlock eyebrow="Decisions" title="Technical decisions" body={projectStory.decisions} />
        <SectionBlock eyebrow="Trade-offs" title="Tradeoffs and constraints" body={projectStory.tradeoffs} />
        <SectionBlock eyebrow="Outcome" title="Outcome and evidence" body={projectStory.outcome} />
        <SectionBlock eyebrow="Learning" title="What was learned" body={projectStory.learning} />
        <SectionBlock eyebrow="Questions" title="Open questions" body={projectStory.questions} />
      </section>
    </main>
  );
}
