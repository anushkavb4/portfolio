"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { featuredProjects } from "@/data/resume-atlas";

const filters = ["all", "enterprise-ai", "platform-engineering", "machine-learning", "ai-safety"] as const;

export default function WorkPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return featuredProjects.filter((project) => {
      const matchesFilter = activeFilter === "all" || project.category === activeFilter;
      const haystack = `${project.name} ${project.shortTitle} ${project.summary} ${project.systems.join(" ")} ${project.contexts.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  const projectGroups = [
    {
      id: "professional-experience",
      title: "Professional experience",
      description: "Work delivered in company and research-team roles.",
      projects: visibleProjects.filter((project) => project.workType === "professional-experience"),
    },
    {
      id: "independent-work",
      title: "Independent projects & research",
      description: "Personal builds, prototypes, and independent research.",
      projects: visibleProjects.filter((project) => project.workType === "independent-work"),
    },
  ].filter((group) => group.projects.length > 0);

  return (
    <main className="page-shell">
      <section className="section">
        <div className="search-panel">
          <label className="search-label" htmlFor="work-search">
            Search work
          </label>
          <input
            id="work-search"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project, system, or context"
          />
        </div>

        <div className="atlas-toolbar" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "All" : filter.replace("-", " ")}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <div className="empty-state">
            <h2>No matching work found</h2>
            <p>Try a different keyword or reset the filters to see the full research map.</p>
            <button type="button" className="secondary-button" onClick={() => { setQuery(""); setActiveFilter("all"); }}>
              Reset filters
            </button>
          </div>
        ) : (
          <div className="work-groups">
            {projectGroups.map((group) => (
              <section className="work-group" key={group.id} aria-labelledby={`${group.id}-title`}>
                <header className="work-group-heading">
                  <div>
                    <h2 id={`${group.id}-title`}>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span>{group.projects.length} {group.projects.length === 1 ? "entry" : "entries"}</span>
                </header>
                <div className="question-list">
                  {group.projects.map((project) => (
                    <article key={project.slug} className="question-card">
                      <div>
                        <div className="project-meta-row">
                          <span className="status-badge">{project.status}</span>
                          <span className="meta-label">{project.category.replaceAll("-", " ")}</span>
                        </div>
                        <h3>{project.name}</h3>
                        <p>
                          {[project.organization, project.role, project.period, project.location]
                            .filter((value) => value !== "Not specified")
                            .join(" · ")}
                        </p>
                        <p>{project.summary}</p>
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
