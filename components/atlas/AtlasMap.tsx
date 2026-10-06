"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { atlasNodes, featuredProjects, researchQuestions } from "@/data/resume-atlas";
import { getProjectHref } from "@/lib/project-routes";

const positions = [
  { left: "18%", top: "39%" },
  { left: "38%", top: "10%" },
  { left: "66%", top: "24%" },
  { left: "52%", top: "64%" },
  { left: "20%", top: "74%" },
];

export function AtlasMap() {
  const [selectedId, setSelectedId] = useState(atlasNodes[0]?.id ?? "");

  const selectedNode = useMemo(
    () => atlasNodes.find((node) => node.id === selectedId) ?? atlasNodes[0],
    [selectedId],
  );
  const relatedContent = selectedNode?.relatedSlugs.map((slug) => {
    const project = featuredProjects.find((item) => item.slug === slug);
    if (project) return { label: project.name, href: getProjectHref(project) };

    const question = researchQuestions.find((item) => item.slug === slug);
    if (question) return { label: question.title, href: `/questions#${question.slug}` };

    return { label: slug, href: undefined };
  }) ?? [];

  return (
    <div className="atlas-shell">
      <div className="atlas-visual" role="group" aria-label="Interactive research atlas">
        {atlasNodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className={`atlas-node ${node.kind} ${selectedId === node.id ? "selected" : ""}`}
            style={{
              left: positions[index]?.left ?? "50%",
              top: positions[index]?.top ?? "50%",
            }}
            onClick={() => setSelectedId(node.id)}
            aria-pressed={selectedId === node.id}
            aria-controls="atlas-insight"
          >
            {node.label}
          </button>
        ))}
        <div className="atlas-connector connector-a" aria-hidden="true" />
        <div className="atlas-connector connector-b" aria-hidden="true" />
        <div className="atlas-connector connector-c" aria-hidden="true" />
        <div className="atlas-connector connector-d" aria-hidden="true" />
      </div>

      <section className="atlas-insight" id="atlas-insight" aria-live="polite">
        <p className="eyebrow">Selected node</p>
        <h3>{selectedNode?.label}</h3>
        <p>{selectedNode?.description}</p>
        <ul>
          {relatedContent.map((item) => (
            <li key={item.label}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
