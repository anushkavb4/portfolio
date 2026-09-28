import Link from "next/link";
import { featuredProjects } from "@/data/atlas";

export default function WorkPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Work</span>
          <span className="brand-name">Selected projects</span>
        </div>
      </header>

      <section className="section">
        <div className="question-list">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="question-card">
              <span className="question-index">{project.order.toString().padStart(2, "0")}</span>
              <div>
                <div className="project-meta-row">
                  <span className="status-badge">{project.status}</span>
                  <span className="meta-label">{project.category}</span>
                </div>
                <h2>{project.name}</h2>
                <p>{project.shortTitle}</p>
                <p>{project.summary}</p>
                <p>
                  <strong>Systems:</strong> {project.systems.join(" · ")}
                </p>
                <div className="project-links">
                  <Link href={`/work/${project.slug}`} className="secondary-button">
                    Open case study
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
