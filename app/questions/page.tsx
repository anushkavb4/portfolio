import Link from "next/link";
import { featuredProjects, notes, researchQuestions } from "@/data/resume-atlas";

export default function QuestionsPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Questions</span>
          <span className="brand-name">Research directions</span>
        </div>
        <nav className="nav" aria-label="Questions navigation">
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="section">
        {researchQuestions.length === 0 ? (
          <div className="empty-state"><h2>No questions published</h2><p>Research questions will appear here when available.</p></div>
        ) : (
          <div className="question-list">
            {researchQuestions.map((question) => {
              const relatedProjects = featuredProjects.filter((project) =>
                question.relatedSystems.includes(project.slug),
              );
              const relatedNotes = relatedProjects.flatMap((project) =>
                notes.filter((note) => note.relatedProject === project.slug),
              );

              return (
                <article id={question.slug} key={question.slug} className="question-card">
                  <span className="question-index">{question.confidence}</span>
                  <div>
                    <h2>{question.title}</h2>
                    <p>{question.question}</p>
                    <p><strong>Why it matters:</strong> {question.whyItMatters}</p>
                    <div className="related-inline">
                      <strong>Related work:</strong>
                      {relatedProjects.map((project) => (
                        <Link href={`/work/${project.slug}`} key={project.slug}>{project.name}</Link>
                      ))}
                      {relatedNotes.map((note) => (
                        <Link href={`/notes/${note.slug}`} key={note.slug}>{note.title}</Link>
                      ))}
                      {relatedProjects.length === 0 && <span>No related projects yet.</span>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
