"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { independentWork } from "@/data/resume-atlas";
import { getProjectHref } from "@/lib/project-routes";

const filters = ["all", "enterprise-ai", "platform-engineering", "machine-learning", "ai-safety"] as const;

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return independentWork.filter((project) => {
      const matchesFilter = activeFilter === "all" || project.category === activeFilter;
      const haystack = `${project.name} ${project.shortTitle} ${project.summary} ${project.organization} ${project.systems.join(" ")} ${project.contexts.join(" ")} ${project.technologies.join(" ")}`.toLowerCase();
      return matchesFilter && (normalizedQuery.length === 0 || haystack.includes(normalizedQuery));
    });
  }, [query, activeFilter]);

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Outside company roles</p>
          <h1>Independent projects & research</h1>
          <p className="section-intro">Personal builds, prototypes, and research work.</p>
        </div>

        <div className="search-panel">
          <label className="search-label" htmlFor="project-search">Search projects</label>
          <input
            id="project-search"
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
              {filter === "all" ? "All" : filter.replaceAll("-", " ")}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <div className="empty-state">
            <h2>No matching projects found</h2>
            <p>Try a different keyword or reset the filters to see all independent projects.</p>
            <button type="button" className="secondary-button" onClick={() => { setQuery(""); setActiveFilter("all"); }}>
              Reset filters
            </button>
          </div>
        ) : (
          <div className="question-list">
            {visibleProjects.map((project) => (
              <article key={project.slug} className="question-card">
                <div>
                  <div className="project-meta-row">
                    <span className="status-badge">{project.status}</span>
                    <span className="meta-label">{project.category.replaceAll("-", " ")}</span>
                  </div>
                  <h2>{project.name}</h2>
                  <p>{[project.organization, project.role, project.period].filter((value) => value !== "Not specified").join(" · ")}</p>
                  <p>{project.summary}</p>
                  <div className="project-links">
                    <Link href={getProjectHref(project)} className="secondary-button">Open project</Link>
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