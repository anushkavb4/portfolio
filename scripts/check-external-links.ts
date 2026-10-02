import { profile } from "../data/profile";
import { featuredProjects } from "../data/resume-atlas";

const urls = [
  profile.github,
  profile.linkedin,
  ...featuredProjects.flatMap((project) => project.links.map((link) => link.url)),
];
const uniqueUrls = [...new Set(urls)];
const restrictedStatuses = new Set([401, 403, 429, 999]);

async function checkExternalLinks() {
  let failed = false;

  for (const url of uniqueUrls) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
      });
      const status = response.status;
      const label = response.ok ? "OK" : restrictedStatuses.has(status) ? "RESTRICTED" : "FAIL";
      const redirect = response.url !== url ? ` -> ${response.url}` : "";

      console.log(`${label} ${status} ${url}${redirect}`);
      await response.body?.cancel();

      if (!response.ok && !restrictedStatuses.has(status)) {
        failed = true;
      }
    } catch (error) {
      failed = true;
      console.error(`FAIL ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failed) {
    process.exitCode = 1;
  }
}

void checkExternalLinks();