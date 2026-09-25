import Link from "next/link";
import { notes } from "@/data/atlas";

export default function NotesPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Notes</span>
          <span className="brand-name">Working observations</span>
        </div>
      </header>

      <section className="section">
        <div className="question-list">
          {notes.map((note) => (
            <article key={note.slug} className="question-card">
              <span className="question-index">{note.status}</span>
              <div>
                <h2>{note.title}</h2>
                <p>{note.summary}</p>
                <p>
                  <strong>Related project:</strong> {note.relatedProject}
                </p>
                <Link href={`/notes/${note.slug}`} className="secondary-button">
                  Read note
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
