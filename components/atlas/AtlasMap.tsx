"use client";

import { useMemo, useState } from "react";
import { atlasNodes } from "@/data/atlas";

const positions = [
  { left: "8%", top: "22%" },
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

  return (
    <div className="atlas-shell">
      <div className="atlas-visual" aria-label="Interactive research atlas">
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
          >
            {node.label}
          </button>
        ))}
        <div className="atlas-connector connector-a" aria-hidden="true" />
        <div className="atlas-connector connector-b" aria-hidden="true" />
        <div className="atlas-connector connector-c" aria-hidden="true" />
        <div className="atlas-connector connector-d" aria-hidden="true" />
      </div>

      <div className="atlas-insight">
        <p className="eyebrow">Selected node</p>
        <h3>{selectedNode?.label}</h3>
        <p>{selectedNode?.description}</p>
        <ul>
          {selectedNode?.relatedSlugs.map((slug) => (
            <li key={slug}>{slug}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
