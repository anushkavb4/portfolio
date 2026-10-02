import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/content/SectionBlock";
import { featuredProjects, notes, researchQuestions } from "@/data/resume-atlas";

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

  const relatedQuestions = researchQuestions.filter((question) =>
    question.relatedSystems.includes(project.slug),
  );
  const relatedNotes = notes.filter((note) => note.relatedProject === project.slug);

  return (
    <main className="page-shell">
      <section className="section">
        <header className="project-intro">
          <p className="eyebrow">{project.organization} · {project.category.replaceAll("-", " ")}</p>
          <h1>{project.name}</h1>
          <p className="project-intro-summary">{project.summary}</p>
          <p className="project-intro-meta">
            {[project.role, project.period, project.location]
              .filter((value) => value !== "Not specified")
              .join(" · ")}
          </p>
          <div className="project-links">
            <Link href="/work" className="secondary-button">
              Back to work
            </Link>
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                className="secondary-button"
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {project.disclosure && <p>{project.disclosure}</p>}
        </header>

        {project.workflow && (
          <figure className="workflow-figure" aria-labelledby="workflow-title">
            <p className="eyebrow">Workflow</p>
            <h2 id="workflow-title">How the system moves</h2>
            <ol className="workflow-steps">
              {project.workflow.steps.map((step, index) => (
                <li className="workflow-step" key={step.title}>
                  <span className="workflow-step-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="workflow-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figcaption>{project.workflow.caption}</figcaption>
          </figure>
        )}
        {project.caseStudy.map((section) => (
          <SectionBlock
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            body={section.body}
            bullets={section.bullets}
          />
        ))}
        <section className="related-content" aria-labelledby="related-content-title">
          <h2 id="related-content-title">Related content</h2>
          <div className="related-content-grid">
            <div>
              <h3>Research questions</h3>
              {relatedQuestions.length > 0 ? (
                <ul>{relatedQuestions.map((question) => (
                  <li key={question.slug}><Link href={`/questions#${question.slug}`}>{question.title}</Link></li>
                ))}</ul>
              ) : <p>No linked questions for this project.</p>}
            </div>
            <div>
              <h3>Notes</h3>
              {relatedNotes.length > 0 ? (
                <ul>{relatedNotes.map((note) => (
                  <li key={note.slug}><Link href={`/notes/${note.slug}`}>{note.title}</Link></li>
                ))}</ul>
              ) : <p>No linked notes for this project.</p>}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
