import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionBlock } from "@/components/content/SectionBlock";
import { notes } from "@/data/atlas";

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

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Note</span>
          <span className="brand-name">{note.title}</span>
        </div>
      </header>

      <section className="section">
        <div className="collab-panel" style={{ display: "grid", gap: "1rem" }}>
          <p className="kicker" style={{ margin: 0 }}>{note.status}</p>
          <h1 style={{ margin: 0 }}>{note.title}</h1>
          <p>{note.summary}</p>
          <p>
            <strong>Related project:</strong> {note.relatedProject}
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
      </section>
    </main>
  );
}
