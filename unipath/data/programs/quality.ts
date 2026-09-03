import type { ProgramDetail } from "./schema";

export function getProgramDataIssues(programs: ProgramDetail[]) {
  const issues: string[] = [];
  const ids = new Set<string>();

  for (const program of programs) {
    const routeKey = `${program.universityId}/${program.id}`;

    if (ids.has(routeKey)) {
      issues.push(`Duplicate program route: ${routeKey}`);
    }
    ids.add(routeKey);

    if (!program.officialUrl.startsWith("https://")) {
      issues.push(`Non-HTTPS official URL: ${routeKey}`);
    }

    if (program.whatYouStudy.length === 0) {
      issues.push(`Missing study areas: ${routeKey}`);
    }

    if (program.careers.length === 0) {
      issues.push(`Missing career examples: ${routeKey}`);
    }
  }

  return issues;
}
