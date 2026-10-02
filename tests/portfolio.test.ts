import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  atlasEdges,
  atlasNodes,
  featuredProjects,
  homepageIndependentWork,
  homepageProfessionalExperience,
  independentWork,
  notes,
  professionalExperience,
  researchQuestions,
} from "../data/resume-atlas";
import { buildSearchIndex, filterSearchEntries, getSearchFacets } from "../lib/search";
import { profile } from "../data/profile";

const entries = buildSearchIndex(featuredProjects, researchQuestions, notes);

test("professional and independent projects form a complete, non-overlapping split", () => {
  const groupedSlugs = [...professionalExperience, ...independentWork].map((project) => project.slug);

  assert.equal(new Set(groupedSlugs).size, featuredProjects.length);
  assert.deepEqual(new Set(groupedSlugs), new Set(featuredProjects.map((project) => project.slug)));
  assert.ok(professionalExperience.every((project) => project.workType === "professional-experience"));
  assert.ok(independentWork.every((project) => project.workType === "independent-work"));
});

test("content slugs and atlas relationships resolve", () => {
  const projectSlugs = new Set(featuredProjects.map((project) => project.slug));
  const questionSlugs = new Set(researchQuestions.map((question) => question.slug));
  const nodeIds = new Set(atlasNodes.map((node) => node.id));

  assert.equal(projectSlugs.size, featuredProjects.length);
  assert.equal(questionSlugs.size, researchQuestions.length);
  assert.equal(nodeIds.size, atlasNodes.length);

  for (const node of atlasNodes) {
    for (const slug of node.relatedSlugs) {
      assert.ok(projectSlugs.has(slug) || questionSlugs.has(slug), `${node.id} references missing content: ${slug}`);
    }
  }

  for (const edge of atlasEdges) {
    assert.ok(nodeIds.has(edge.source), `${edge.id} has a missing source`);
    assert.ok(nodeIds.has(edge.target), `${edge.id} has a missing target`);
  }

  for (const question of researchQuestions) {
    for (const slug of question.relatedSystems) {
      assert.ok(projectSlugs.has(slug), `${question.slug} references missing project: ${slug}`);
    }
  }

  for (const note of notes) {
    assert.ok(projectSlugs.has(note.relatedProject), `${note.slug} references missing project: ${note.relatedProject}`);
  }
});

test("indexed content maps to existing project, question, and note routes", () => {
  assert.ok(existsSync("app/work/[slug]/page.tsx"));
  assert.ok(existsSync("app/questions/page.tsx"));
  assert.ok(existsSync("app/notes/[slug]/page.tsx"));
  assert.ok(existsSync("app/search/page.tsx"));

  for (const project of featuredProjects) {
    assert.ok(entries.some((entry) => entry.kind === "project" && entry.href === `/work/${project.slug}`));
  }
  for (const question of researchQuestions) {
    assert.ok(entries.some((entry) => entry.kind === "question" && entry.href === `/questions#${question.slug}`));
  }
  for (const note of notes) {
    assert.ok(entries.some((entry) => entry.kind === "note" && entry.href === `/notes/${note.slug}`));
  }
});

test("search covers all content and matches every query term", () => {
  assert.equal(entries.length, featuredProjects.length + researchQuestions.length + notes.length);
  assert.deepEqual(
    filterSearchEntries(entries, { query: "  GOFER controls " }).map((entry) => entry.kind),
    ["project", "question", "note"],
  );
});

test("system and linked-question facets include related projects and notes", () => {
  const ragResults = filterSearchEntries(entries, { system: "RAG" });
  assert.deepEqual(ragResults.map((entry) => entry.slug), [
    "ebrd-rag",
    "measuring-retrieval",
    "retrieval-pipeline-outcomes",
  ]);

  const questionResults = filterSearchEntries(entries, { question: "operational-guardrails" });
  assert.deepEqual(questionResults.map((entry) => entry.slug), [
    "cern-gofer",
    "aiassistant-platform",
    "operational-guardrails",
    "gofer-service-controls",
  ]);

  const facets = getSearchFacets(entries);
  assert.ok(facets.systems.includes("RAG"));
  assert.ok(facets.contexts.includes("Particle physics"));
  assert.ok(facets.domains.includes("platform-engineering"));
});

test("filters intersect and clearing filters returns every record", () => {
  assert.deepEqual(
    filterSearchEntries(entries, {
      domain: "enterprise-ai",
      system: "RAG",
      context: "Particle physics",
    }),
    [],
  );
  assert.equal(filterSearchEntries(entries, {}).length, entries.length);
});

test("leadership and campus involvement has a dedicated page", () => {
  assert.ok(existsSync("app/involvement/page.tsx"));
  assert.ok(profile.involvement.length > 0);
  assert.ok(profile.involvement.some((item) => item.organization.includes("Student Activity Council")));
});

test("homepage highlights current roles and recent independent research", () => {
  assert.deepEqual(homepageProfessionalExperience.map((project) => project.slug), [
    "moqi-collective-intelligence",
    "ebrd-agentic-ai",
    "cern-gofer",
  ]);
  assert.ok(homepageIndependentWork.some((project) => project.slug === "multilingual-safety-alignment"));
  assert.ok(homepageIndependentWork.some((project) => project.slug === "alzheimers-detection-ensembles"));
});