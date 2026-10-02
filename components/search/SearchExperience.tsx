"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredProjects, notes, researchQuestions } from "@/data/resume-atlas";
import { buildSearchIndex, filterSearchEntries, getSearchFacets, type SearchContentKind } from "@/lib/search";

type KindFilter = "all" | SearchContentKind;

const entries = buildSearchIndex(featuredProjects, researchQuestions, notes);
const filters = getSearchFacets(entries);

const kindOptions: { value: "all" | SearchContentKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "question", label: "Questions" },
  { value: "note", label: "Notes" },
];

export default function SearchExperience() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [system, setSystem] = useState("");
  const [context, setContext] = useState("");
  const [domain, setDomain] = useState("");
  const [question, setQuestion] = useState("");
  const visibleEntries = filterSearchEntries(entries, { query, kind, system, context, domain, question });

  function resetFilters() {
    setQuery("");
    setKind("all");
    setSystem("");
    setContext("");
    setDomain("");
    setQuestion("");
  }

  return (
    <main className="page-shell">
      <section className="section" aria-labelledby="search-title">
        <div className="section-heading">
          <p className="eyebrow">Projects · Questions · Notes</p>
          <h1 id="search-title">Search across the atlas</h1>
        </div>

        <div className="search-panel">
          <label className="search-label" htmlFor="site-search">Search all content</label>
          <input
            id="site-search"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try a project, technology, institution, or outcome"
          />
        </div>

        <div className="search-kind-control" role="group" aria-label="Content type">
          {kindOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={kind === option.value}
              className={kind === option.value ? "active" : ""}
              onClick={() => setKind(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="search-filters" aria-label="Search filters">
          <label>
            <span>System</span>
            <select value={system} onChange={(event) => setSystem(event.target.value)}>
              <option value="">Any system</option>
              {filters.systems.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Context</span>
            <select value={context} onChange={(event) => setContext(event.target.value)}>
              <option value="">Any context</option>
              {filters.contexts.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Domain</span>
            <select value={domain} onChange={(event) => setDomain(event.target.value)}>
              <option value="">Any domain</option>
              {filters.domains.map((value) => <option key={value} value={value}>{value.replaceAll("-", " ")}</option>)}
            </select>
          </label>
          <label>
            <span>Research question</span>
            <select value={question} onChange={(event) => setQuestion(event.target.value)}>
              <option value="">Any question</option>
              {researchQuestions.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
            </select>
          </label>
        </div>

        <p className="search-result-count" aria-live="polite">
          {visibleEntries.length} {visibleEntries.length === 1 ? "result" : "results"}
        </p>

        {visibleEntries.length === 0 ? (
          <div className="empty-state">
            <h2>No matching content</h2>
            <p>Try another term or remove one or more filters.</p>
            <button type="button" className="secondary-button" onClick={resetFilters}>
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="search-results">
            {visibleEntries.map((entry) => (
              <article className="question-card search-result" key={`${entry.kind}-${entry.slug}`}>
                <span className="question-index">{entry.kind}</span>
                <div>
                  <div className="project-meta-row">
                    {entry.domains.map((value) => <span className="meta-label" key={value}>{value.replaceAll("-", " ")}</span>)}
                  </div>
                  <h2><Link href={entry.href}>{entry.title}</Link></h2>
                  <p>{entry.summary}</p>
                  <p className="search-result-context">
                    {[...entry.contexts, ...entry.systems].slice(0, 4).join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}