import { Project } from "@/app/projects/[id]/page";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ENHANCED_PROJECT_DATA: Project[] = [
  {
    id: 1,
    title: "MatchDarts",
    content:
      "Eine PWA Web App, die es ermöglicht, mit einem Roboter und gegen Freunde Darts zu spielen.",
    description:
      "MatchDarts revolutioniert das klassische Dartspiel durch die Integration von Robotertechnologie und sozialen Gaming-Elementen. Die Progressive Web App ermöglicht es Spielern, sowohl gegen einen präzisen Dart-Roboter als auch gegen Freunde anzutreten.",
    image: "MatchDarts.png",
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
    id: 2,
    title: "MatchKamp",
    content:
      "Fußball-Fanatasy-Manager, bei dem man sein eigenes Bundelsiga-Team erstellen und auf Spiele tippen kann.",
    description:
      "MatchKamp ist eine umfassende Fantasy-Fußball-Plattform, die sich auf die Bundesliga spezialisiert. Benutzer können ihre Traumteams zusammenstellen, an Tippspielrunden teilnehmen und sich mit anderen Fußballfans messen.",
    image:
      "https://res.cloudinary.com/eldoraui/image/upload/v1734107781/Screenshot_2024-12-13_at_10.06.08_PM_molet1.png",
    status: "completed",
    startDate: "2024-07-28",
    teamSize: 4,
    duration: "4 months",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Flask",
      "Python",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/Leon-Achteresch/BuliPred",
    liveUrl: "https://matchkamp.de/",
    features: [
      "Team-Management",
      "Live-Scoring",
      "Tippspiel-System",
      "Echtzeit-Updates",
      "Spieler-Statistiken",
      "Liga-Übersicht",
    ],
  },
  {
    id: 3,
    title: "Portfolio",
    content:
      "Mein Portfolio, dass die meisten Projekte und meine Erfahrungen darstellt.",
    description:
      "Ein modernes, responsives Portfolio, das meine Projekte, Fähigkeiten und beruflichen Erfahrungen präsentiert. Die Seite wurde mit Fokus auf Performance, Zugänglichkeit und benutzerfreundliches Design entwickelt.",
    image: "https://i.ibb.co/DDRSsL5f/Portfolio.png",
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
    // Simuliere eine Delay von 500ms, um die Ladesituation realistisch darzustellen.
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
