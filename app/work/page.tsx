"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { professionalExperience } from "@/data/resume-atlas";
import { getProjectHref } from "@/lib/project-routes";

const filters = ["all", "enterprise-ai", "platform-engineering", "machine-learning", "ai-safety"] as const;

export default function WorkPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return professionalExperience.filter((project) => {
      const matchesFilter = activeFilter === "all" || project.category === activeFilter;
      const haystack = `${project.name} ${project.shortTitle} ${project.summary} ${project.systems.join(" ")} ${project.contexts.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  const ebrdProjects = visibleProjects.filter((project) => project.organization.startsWith("EBRD"));
  const projectGroups = [
    {
      id: "ebrd",
      title: "EBRD",
      description: "Recent role and internship work.",
      sections: [
        {
          id: "recent",
          title: "Recent · Jul 2026 – Present",
          projects: ebrdProjects.filter((project) => project.period.includes("Present")),
        },
        {
          id: "internship",
          title: "Internship · Aug 2025 – Feb 2026",
          projects: ebrdProjects.filter((project) => !project.period.includes("Present")),
        },
      ],
    },
    {
      id: "professional-experience",
      title: "Other professional experience",
      description: "Work delivered in other company and research-team roles.",
      sections: [{ id: "all", title: undefined, projects: visibleProjects.filter((project) => project.workType === "professional-experience" && !project.organization.startsWith("EBRD")) }],
    },
  ].filter((group) => group.sections.some((section) => section.projects.length > 0));

  return (
    <main className="page-shell">
      <section className="section">
        <div className="search-panel">
          <label className="search-label" htmlFor="work-search">
            Search professional work
          </label>
          <input
            id="work-search"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by role, project, system, or context"
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
            <p>Try a different keyword or reset the filters to see all professional experience.</p>
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
                  <span>
                    {group.sections.reduce((total, section) => total + section.projects.length, 0)}{" "}
                    {group.sections.reduce((total, section) => total + section.projects.length, 0) === 1 ? "entry" : "entries"}
                  </span>
                </header>
                {group.sections.filter((section) => section.projects.length > 0).map((section) => (
                  <section className="work-subgroup" key={section.id}>
                    {section.title && <h3 className="work-subgroup-heading">{section.title}</h3>}
                    <div className="question-list">
                      {section.projects.map((project) => (
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
                              <Link href={getProjectHref(project)} className="secondary-button">
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
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
