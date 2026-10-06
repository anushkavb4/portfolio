import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/content/ProjectDetail";
import { featuredProjects } from "@/data/resume-atlas";

export default async function IndependentProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug && item.workType === "independent-work");

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} backHref="/projects" backLabel="Back to projects" />;
}