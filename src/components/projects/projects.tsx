import { type FC } from "react";
import { Goal, Gift, FormInput } from "lucide-react";
import { Features, FeaturesDataProps } from "../ui/features";

const PROJECT_DATA: FeaturesDataProps[] = [
  {
    id: 1,
    title: "1. MatchDarts",
    content:
      "Eine PWA Web App, die es ermöglicht, mit einem Roboter und gegen Freunde Darts zu spielen.",
    image: "MatchDarts.png",
    icon: <Goal className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. MatchKamp",
    content:
      "Fußball-Fanatasy-Manager, bei dem man sein eigenes Bundelsiga-Team erstellen und auf Spiele tippen kann.",
    image:
      "https://res.cloudinary.com/eldoraui/image/upload/v1734107781/Screenshot_2024-12-13_at_10.06.08_PM_molet1.png",
    icon: <Gift className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Portfolio",
    content:
      "Mein Portfolio, dass die meisten Projekte und meine Erfahrungen darstellt.",
    image:
      "https://i.ibb.co/DDRSsL5f/Portfolio.png",
    icon: <FormInput className="w-6 h-6 text-primary" />,
  },
];

export const Projects: FC = () => {
  return (
    <section aria-label="Projekte" className="bg-background h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-foreground">
          Meine Projekte
        </h1>
        <Features data={PROJECT_DATA} />
      </div>
    </section>
  );
};
