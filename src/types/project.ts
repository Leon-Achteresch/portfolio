
export interface ProjectStatus {
  active: "active"
  completed: "completed"
  "on-hold": "on-hold"
}

export interface Project {
  id: number
  title: string
  content: string
  description: string
  image: string
  status: keyof ProjectStatus
  startDate: string
  teamSize: number
  duration: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  features: string[]
  codeSnippet?: {
    code: string
    language: string
    title: string
  }
}

export interface ProjectResponse {
  projects: Project[]
  total: number
}

export interface ProjectDetailsResponse {
  project: Project
}

export interface ProjectError {
  error: string
}
