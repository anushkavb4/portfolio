import { notFound, redirect } from "next/navigation";
import { ProjectDetail } from "@/components/content/ProjectDetail";
import { featuredProjects } from "@/data/resume-atlas";
import { getProjectHref } from "@/lib/project-routes";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  if (project.workType === "independent-work") {
    redirect(getProjectHref(project));
  }

  return <ProjectDetail project={project} backHref="/work" backLabel="Back to work" />;
}
