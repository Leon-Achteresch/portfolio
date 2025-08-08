import { FormInput, Gift, Goal } from "lucide-react";
import { type FC } from "react";
import { Features, FeaturesDataProps } from "../ui/features";

const PROJECT_DATA: FeaturesDataProps[] = [
  {
    id: 1,
    title: "1. KickCompare",
    content:
      "Eine Website um die besten Fußballschuhe zu vergleichen und zu finden.",
    image: "KickComparePage.png",
    icon: <Goal className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Dartsync",
    content:
      "Eine Darts-App, die es ermöglicht, mit einem Roboter und gegen Freunde Darts zu spielen. Aktuell in Review in den App Stores.",
    image:
      "DartSyncPage.png",
    icon: <Gift className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Portfolio",
    content:
      "Mein Portfolio, dass die meisten Projekte und meine Erfahrungen darstellt.",
    image:
      "image.png",
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
