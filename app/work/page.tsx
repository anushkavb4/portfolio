"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { featuredProjects } from "@/data/atlas";

const filters = ["all", "decision-systems", "human-computer-interaction", "research-operations"] as const;

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

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Work</span>
          <span className="brand-name">Selected projects</span>
        </div>
      </header>

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
          <div className="question-list">
            {visibleProjects.map((project) => (
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
        )}
      </section>
    </main>
  );
}
