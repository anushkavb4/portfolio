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
          <p>
            <strong>Outcome:</strong> {project.outcome}
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
        </div>

        <SectionBlock eyebrow="Summary" title="Case summary" body={project.summary} />
        {project.caseStudy.map((section) => (
          <SectionBlock
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            body={section.body}
            bullets={section.bullets}
          />
        ))}
      </section>
    </main>
  );
}
