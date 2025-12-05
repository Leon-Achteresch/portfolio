import { Project } from "@/types/project";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ENHANCED_PROJECT_DATA: Project[] = [
  {
    id: 1,
    title: "KickCompare",
    content:
      "Eine Website um die besten Fußballschuhe zu vergleichen und zu finden.",
    description:
      "KickCompare ist eine moderne Vergleichsplattform für Fußballschuhe, die es Nutzern ermöglicht, verschiedene Modelle zu vergleichen, Bewertungen zu lesen und die perfekten Schuhe für ihre Bedürfnisse zu finden. Die Plattform bietet umfassende Filteroptionen, detaillierte Produktspezifikationen und eine intuitive Benutzeroberfläche.",
    image: "KickComparePage.png",
    status: "active",
    startDate: "2024-12-15",
    teamSize: 2,
    duration: "2 months",
    techStack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "Node.js",
      "PostgreSQL",
      "PWA",
    ],
    githubUrl: "https://github.com/Leon-Achteresch/KampDarts",
    liveUrl: "https://kickcompare.de/",
    features: [
      "Produktvergleich mit Filteroptionen",
      "Detaillierte Produktspezifikationen",
      "Bewertungen und Reviews",
      "Responsive Design",
      "Schnelle Suchfunktion",
      "Intuitive Benutzeroberfläche",
    ],
  },
  {
    id: 2,
    title: "Dartsync",
    content:
      "Darts-App mit Roboter-Integration und Multiplayer gegen Freunde.",
    description:
      "Dartsync verbindet präzise Roboter-Technik mit einem sozialen Multiplayer-Erlebnis. Spiele lokal gegen den Roboter oder online gegen Freunde, verfolge Scores in Echtzeit und speichere Statistiken.",
    image:
      "DartSyncPage.png",
    status: "completed",
    startDate: "2024-08-01",
    teamSize: 2,
    duration: "5 months",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/Leon-Achteresch/KampDarts",
    liveUrl: "https://dartsync.de/",
    features: [
      "Echtzeit-Scoring",
      "Roboter-Steuerung",
      "Online-Multiplayer",
      "Statistiken",
      "PWA-Installation",
      "Offline-Modus",
    ],
  },
  {
    id: 3,
    title: "WorkSheer",
      content:
        "Mein All in One Tool, welches ich im Laufe der Zeit immer weiter ausbaue und verbessere.",
    description:
      "Ein modernes, responsives Tool, welches ich im Laufe der Zeit immer weiter ausbaue und verbessere. Die Seite wurde mit Fokus auf Performance, Zugänglichkeit und benutzerfreundliches Design entwickelt.",
    image: "image.png",
    status: "completed",
    startDate: "2025-02-20",
    teamSize: 1,
    duration: "2 days",
    techStack: [
      "React",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    githubUrl: "https://github.com/Leon-Achteresch/portfolio",
    liveUrl: "https://lync3.leon-achteresch.de",
    features: [
      "Responsive Design",
      "Einkaufsliste",
      "Projekt-Managment",
      "Task-Management",
      "Calendar",
      "Notes",
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        projects: ENHANCED_PROJECT_DATA,
        total: ENHANCED_PROJECT_DATA.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const project = ENHANCED_PROJECT_DATA.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("POST /api/projects failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch project details" },
      { status: 500 }
    );
  }
}
