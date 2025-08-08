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
      "KickCompare revolutioniert das klassische Dartspiel durch die Integration von Robotertechnologie und sozialen Gaming-Elementen. Die Progressive Web App ermöglicht es Spielern, sowohl gegen einen präzisen Dart-Roboter als auch gegen Freunde anzutreten.",
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
    liveUrl: "https://kamp-darts.vercel.app/",
    features: [
      "Echtzeit-Spielverfolgung",
      "Roboter-Integration",
      "Multiplayer-Modus",
      "Statistik-Dashboard",
      "PWA-Installation",
      "Offline-Unterstützung",
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
    liveUrl: "https://kamp-darts.vercel.app/",
    features: [
      "Echtzeit-Scoring",
      "Roboter-Steuerung",
      "Online-Multiplayer",
      "Statistiken",
      "PWA-Installation",
      "Offline-Modus",
    ],
    codeSnippet: {
      code: `export class AdvancedBot extends Bot {
  private readonly strategyEngine = new StrategyEngine();
  private readonly riskManager = new RiskManager();
  private readonly situationAnalyzer = new SituationAnalyzer();

  private readonly gameState = {
    ownScore: 501,
    opponentScore: 501,
    legsWon: 0,
    opponentCheckouts: {
      attempts: 0,
      successes: 0,
      get successRate() {
        return this.attempts > 0 ? this.successes / this.attempts : 0.5;
      },
    },
    lastOpponentScore: 501,
  };

  private getGamePhase(): "opening" | "middle" | "endgame" {
    if (this.gameState.ownScore < 100 || this.gameState.opponentScore < 100)
      return "endgame";
    if (this.gameState.ownScore < 300 || this.gameState.opponentScore < 300)
      return "middle";
    return "opening";
  }

  private updateOpponentStats() {
    const wasCheckout = this.gameState.opponentScore === 0;
    if (wasCheckout) {
      this.gameState.opponentCheckouts.successes++;
    }
    this.gameState.opponentCheckouts.attempts++;
  }

  private updateGameState(socket: socketEmitThrowType) {
    const previousOpponentScore = this.gameState.opponentScore;

    this.gameState.ownScore = socket.currentPlayer.current_score;

    if (this.gameState.ownScore === previousOpponentScore) {
      this.gameState.opponentScore = previousOpponentScore;
    } else {
      this.gameState.opponentScore = this.calculateOpponentScore(
        previousOpponentScore,
        socket.throws
      );
    }

    this.updateOpponentStats();
  }
  private calculateOpponentScore(
    previousScore: number,
    throws: { score: number; multiplier: number }[]
  ): number {
    const lastThrow = throws[0];
    if (!lastThrow) return previousScore;

    return Math.max(0, previousScore - lastThrow.score * lastThrow.multiplier);
  }`,
      language: "typescript",
      title: "Bot Klasse",
    },
  },
  {
    id: 3,
    title: "Portfolio",
    content:
      "Mein Portfolio, dass die meisten Projekte und meine Erfahrungen darstellt.",
    description:
      "Ein modernes, responsives Portfolio, das meine Projekte, Fähigkeiten und beruflichen Erfahrungen präsentiert. Die Seite wurde mit Fokus auf Performance, Zugänglichkeit und benutzerfreundliches Design entwickelt.",
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
    liveUrl: "https://portfolio.example.com",
    features: [
      "Responsive Design",
      "Dark Mode",
      "Projekt-Showcase",
      "Blog-Integration",
      "Kontaktformular",
      "Animationen",
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
