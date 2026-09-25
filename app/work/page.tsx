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
                <h2>{project.name}</h2>
                <p>{project.shortTitle}</p>
                <p>
                  <strong>Category:</strong> {project.category}
                </p>
                <p>
                  <strong>Systems:</strong> {project.systems.join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
