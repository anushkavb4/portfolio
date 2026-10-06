import Link from "next/link";
import { featuredProjects, notes } from "@/data/resume-atlas";
import { getProjectHref } from "@/lib/project-routes";

export default function NotesPage() {
  return (
    <main className="page-shell">
      <section className="section">
        {notes.length === 0 ? (
          <div className="empty-state"><h2>No notes published</h2><p>Project notes will appear here when available.</p></div>
        ) : (
          <div className="question-list">
            {notes.map((note) => {
              const project = featuredProjects.find((item) => item.slug === note.relatedProject);

              return (
                <article key={note.slug} className="question-card">
                  <span className="question-index">{note.status}</span>
                  <div>
                    <div className="project-meta-row">
                      <span className="status-badge">{note.status}</span>
                      {project && <span className="meta-label">{project.category.replaceAll("-", " ")}</span>}
                    </div>
                    <h2>{note.title}</h2>
                    <p>{note.summary}</p>
                    <p>
                      <strong>Related project:</strong>{" "}
                      {project ? <Link href={getProjectHref(project)}>{project.name}</Link> : "No related project linked."}
                    </p>
                    <div className="project-links">
                      <Link href={`/notes/${note.slug}`} className="secondary-button">Read note</Link>
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
