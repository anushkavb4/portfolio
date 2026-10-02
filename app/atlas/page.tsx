"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { atlasEdges, atlasNodes, featuredProjects, researchQuestions } from "@/data/resume-atlas";

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
              aria-pressed={selectedKind === kind}
              onClick={() => setSelectedKind(kind)}
            >
              {kind === "all" ? "All" : kind}
            </button>
          ))}
        </div>

        <div className="atlas-page-layout">
          <div className="atlas-page-visual" aria-hidden="true">
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
                  <li key={project.slug}><Link href={`/work/${project.slug}`}>{project.name}</Link></li>
                ))}
                {relatedProjects.length === 0 && <li>No related projects for these nodes.</li>}
              </ul>
            </div>

            <div className="atlas-sidebar-panel">
              <p className="eyebrow">Related questions</p>
              <ul>
                {relatedQuestions.map((question) => (
                  <li key={question.slug}><Link href={`/questions#${question.slug}`}>{question.title}</Link></li>
                ))}
                {relatedQuestions.length === 0 && <li>No related questions for these nodes.</li>}
              </ul>
            </div>
          </aside>
        </div>

        <details className="atlas-text-fallback">
          <summary>Read the atlas as text</summary>
          <ul>
            {atlasNodes.map((node) => {
              const relatedLabels = node.relatedSlugs.map((slug) => {
                const project = featuredProjects.find((item) => item.slug === slug);
                if (project) return project.name;

                const question = researchQuestions.find((item) => item.slug === slug);
                return question?.title ?? slug;
              });

              return (
                <li key={node.id}>
                  <strong>{node.label} ({node.kind}):</strong> {node.description}{" "}
                  <span>Related: {relatedLabels.join("; ")}</span>
                </li>
              );
            })}
          </ul>
          <h3>Connections</h3>
          <ul>
            {atlasEdges.map((edge) => {
              const source = atlasNodes.find((node) => node.id === edge.source);
              const target = atlasNodes.find((node) => node.id === edge.target);

              return (
                <li key={edge.id}>
                  {source?.label} {edge.type.replaceAll("-", " ")} {target?.label}
                </li>
              );
            })}
          </ul>
        </details>
      </section>
    </main>
  );
}
