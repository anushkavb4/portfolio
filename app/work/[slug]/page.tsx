import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects } from "@/data/atlas";

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = featuredProjects.find((item) => item.slug === (async () => (await params).slug)());

  if (!project) {
    notFound();
  }

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
      </section>
    </main>
  );
}
