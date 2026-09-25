import { z } from "zod";

export const atlasNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(["problem", "system", "context", "project", "question"]),
  description: z.string().min(1),
  relatedSlugs: z.array(z.string()).default([]),
});

export const atlasEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.enum(["informs", "implemented-in", "constrained-by", "raises-question-about"]),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortTitle: z.string().min(1),
  category: z.string().min(1),
  status: z.enum(["selected-work", "current-work", "experimental", "archive"]),
  contexts: z.array(z.string()).default([]),
  systems: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
});

export const researchQuestionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  question: z.string().min(1),
  whyItMatters: z.string().min(1),
  relatedSystems: z.array(z.string()).default([]),
  confidence: z.enum(["low", "medium", "high"]),
  unknowns: z.array(z.string()).default([]),
});

export const portfolioSchema = z.object({
  atlasNodes: z.array(atlasNodeSchema),
  atlasEdges: z.array(atlasEdgeSchema),
  projects: z.array(projectSchema),
  questions: z.array(researchQuestionSchema),
});

export function validatePortfolioContent(input: unknown) {
  const result = portfolioSchema.safeParse(input);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");

    throw new Error(`Portfolio content validation failed: ${issues}`);
  }

  return result.data;
}
