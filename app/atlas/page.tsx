"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { atlasEdges, atlasNodes, featuredProjects, researchQuestions } from "@/data/atlas";

const kinds = ["all", "problem", "system", "context", "project", "question"] as const;

export default function AtlasPage() {
  const [selectedKind, setSelectedKind] = useState<(typeof kinds)[number]>("all");

  const visibleNodes = useMemo(() => {
    if (selectedKind === "all") return atlasNodes;
    return atlasNodes.filter((node) => node.kind === selectedKind);
  }, [selectedKind]);

  const relatedProjects = featuredProjects.filter((project) =>
    visibleNodes.some((node) => node.relatedSlugs.includes(project.slug)),
  );

  const relatedQuestions = researchQuestions.filter((question) =>
    visibleNodes.some((node) => node.relatedSlugs.includes(question.slug)),
  );

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Atlas</span>
          <span className="brand-name">Research map</span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/questions">Questions</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/collaborate">Collaborate</Link>
        </nav>
      </header>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Map of the work</p>
          <h2>Research connections</h2>
        </div>

        <div className="atlas-toolbar" aria-label="Atlas filters">
          {kinds.map((kind) => (
            <button
              key={kind}
              type="button"
              className={`filter-chip ${selectedKind === kind ? "active" : ""}`}
              onClick={() => setSelectedKind(kind)}
            >
              {kind === "all" ? "All" : kind}
            </button>
          ))}
        </div>

        <div className="atlas-page-layout">
          <div className="atlas-page-visual">
            {visibleNodes.map((node, index) => (
              <div
                key={node.id}
                className={`atlas-page-node ${node.kind}`}
                style={{
                  left: `${18 + (index % 3) * 30}%`,
                  top: `${22 + Math.floor(index / 3) * 28}%`,
                }}
              >
                {node.label}
              </div>
            ))}
            {atlasEdges.map((edge) => (
              <div
                key={edge.id}
                className={`atlas-page-edge ${edge.type}`}
                aria-hidden="true"
              />
            ))}
          </div>

          <aside className="atlas-sidebar">
            <div className="atlas-sidebar-panel">
              <p className="eyebrow">Visible nodes</p>
              <ul>
                {visibleNodes.map((node) => (
                  <li key={node.id}>{node.label}</li>
                ))}
              </ul>
            </div>

            <div className="atlas-sidebar-panel">
              <p className="eyebrow">Related projects</p>
              <ul>
                {relatedProjects.map((project) => (
                  <li key={project.slug}>{project.name}</li>
                ))}
              </ul>
            </div>

            <div className="atlas-sidebar-panel">
              <p className="eyebrow">Related questions</p>
              <ul>
                {relatedQuestions.map((question) => (
                  <li key={question.slug}>{question.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
