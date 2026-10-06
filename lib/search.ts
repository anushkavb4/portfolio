import type { PortfolioProject, ProjectNote, ResearchQuestion } from "../data/resume-atlas";
import { getProjectHref } from "./project-routes";

export type SearchContentKind = "project" | "question" | "note";

export type SearchEntry = {
  slug: string;
  kind: SearchContentKind;
  title: string;
  summary: string;
  href: string;
  systems: string[];
  contexts: string[];
  domains: string[];
  questionSlugs: string[];
  searchableText: string;
};

export type SearchFilters = {
  query?: string;
  kind?: "all" | SearchContentKind;
  system?: string;
  context?: string;
  domain?: string;
  question?: string;
};

export type SearchFacets = {
  systems: string[];
  contexts: string[];
  domains: string[];
};

const unique = (values: string[]) => [...new Set(values)].sort((left, right) => left.localeCompare(right));

export function buildSearchIndex(
  projects: PortfolioProject[],
  questions: ResearchQuestion[],
  notes: ProjectNote[],
): SearchEntry[] {
  const questionSlugsForProject = (projectSlug: string) =>
    questions
      .filter((question) => question.relatedSystems.includes(projectSlug))
      .map((question) => question.slug);

  const projectEntries: SearchEntry[] = projects.map((project) => ({
    slug: project.slug,
    kind: "project",
    title: project.name,
    summary: project.summary,
    href: getProjectHref(project),
    systems: project.systems,
    contexts: project.contexts,
    domains: [project.category],
    questionSlugs: questionSlugsForProject(project.slug),
    searchableText: [
      project.name,
      project.shortTitle,
      project.organization,
      project.role,
      project.period,
      project.location,
      project.category,
      project.summary,
      project.outcome,
      project.disclosure,
      ...project.systems,
      ...project.contexts,
      ...project.technologies,
      ...project.caseStudy.flatMap((section) => [section.title, section.body]),
      ...(project.workflow?.steps.flatMap((step) => [step.title, step.detail]) ?? []),
    ].join(" ").toLowerCase(),
  }));

  const questionEntries: SearchEntry[] = questions.map((question) => {
    const relatedProjects = projects.filter((project) =>
      question.relatedSystems.includes(project.slug),
    );

    return {
      slug: question.slug,
      kind: "question",
      title: question.title,
      summary: question.question,
      href: `/questions#${question.slug}`,
      systems: unique(relatedProjects.flatMap((project) => project.systems)),
      contexts: unique(relatedProjects.flatMap((project) => project.contexts)),
      domains: unique(relatedProjects.map((project) => project.category)),
      questionSlugs: [question.slug],
      searchableText: [
        question.title,
        question.question,
        question.whyItMatters,
        ...question.unknowns,
        ...relatedProjects.flatMap((project) => [project.name, ...project.systems, ...project.contexts]),
      ].join(" ").toLowerCase(),
    };
  });

  const noteEntries: SearchEntry[] = notes.map((note) => {
    const relatedProject = projects.find((project) => project.slug === note.relatedProject);

    return {
      slug: note.slug,
      kind: "note",
      title: note.title,
      summary: note.summary,
      href: `/notes/${note.slug}`,
      systems: relatedProject?.systems ?? [],
      contexts: relatedProject?.contexts ?? [],
      domains: relatedProject ? [relatedProject.category] : [],
      questionSlugs: relatedProject ? questionSlugsForProject(relatedProject.slug) : [],
      searchableText: [
        note.title,
        note.summary,
        ...note.sections.flatMap((section) => [section.title, section.body]),
        relatedProject?.name ?? "",
        ...(relatedProject?.systems ?? []),
        ...(relatedProject?.contexts ?? []),
      ].join(" ").toLowerCase(),
    };
  });

  return [...projectEntries, ...questionEntries, ...noteEntries];
}

export function getSearchFacets(entries: SearchEntry[]): SearchFacets {
  return {
    systems: unique(entries.flatMap((entry) => entry.systems)),
    contexts: unique(entries.flatMap((entry) => entry.contexts)),
    domains: unique(entries.flatMap((entry) => entry.domains)),
  };
}

export function filterSearchEntries(entries: SearchEntry[], filters: SearchFilters): SearchEntry[] {
  const queryTerms = filters.query?.trim().toLowerCase().split(/\s+/).filter(Boolean) ?? [];

  return entries.filter((entry) =>
    (!filters.kind || filters.kind === "all" || entry.kind === filters.kind)
    && queryTerms.every((term) => entry.searchableText.includes(term))
    && (!filters.system || entry.systems.includes(filters.system))
    && (!filters.context || entry.contexts.includes(filters.context))
    && (!filters.domain || entry.domains.includes(filters.domain))
    && (!filters.question || entry.questionSlugs.includes(filters.question)),
  );
}
