import type { PortfolioProject } from "@/data/resume-atlas";

export function getProjectHref(project: Pick<PortfolioProject, "slug" | "workType">) {
  const section = project.workType === "independent-work" ? "projects" : "work";
  return `/${section}/${project.slug}`;
}