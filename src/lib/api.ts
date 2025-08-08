import { Project } from "@/types/project";

export async function fetchProject(projectId: number): Promise<Project | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: projectId }),
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.project;
}
