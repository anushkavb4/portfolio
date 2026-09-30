import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/content/SectionBlock";
import { featuredProjects, notes, researchQuestions } from "@/data/resume-atlas";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    notFound();
  }

  const relatedProject = featuredProjects.find((project) => project.slug === note.relatedProject);
  const relatedQuestions = researchQuestions.filter((question) =>
    question.relatedSystems.includes(note.relatedProject),
  );

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Note</span>
          <span className="brand-name">{note.title}</span>
        </div>
        <nav className="nav" aria-label="Note navigation">
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="section">
        <div className="collab-panel" style={{ display: "grid", gap: "1rem" }}>
          <p className="kicker" style={{ margin: 0 }}>{note.status}</p>
          <h1 style={{ margin: 0 }}>{note.title}</h1>
          <p>{note.summary}</p>
          <p>
            <strong>Related project:</strong>{" "}
            {relatedProject ? <Link href={`/work/${relatedProject.slug}`}>{relatedProject.name}</Link> : "No related project linked."}
          </p>
          <div className="project-links">
            <Link href="/notes" className="secondary-button">
              Back to notes
            </Link>
          </div>
        </div>

        {note.sections.map((section) => (
          <SectionBlock
            key={section.title}
            eyebrow={note.title}
            title={section.title}
            body={section.body}
          />
        ))}
        <section className="related-content" aria-labelledby="related-questions-title">
          <h2 id="related-questions-title">Related questions</h2>
          {relatedQuestions.length > 0 ? (
            <ul>{relatedQuestions.map((question) => (
              <li key={question.slug}><Link href={`/questions#${question.slug}`}>{question.title}</Link></li>
            ))}</ul>
          ) : <p>No linked questions for this note.</p>}
        </section>
      </section>
    </main>
  );
}
