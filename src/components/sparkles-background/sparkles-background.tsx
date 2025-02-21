import { FC } from "react";
import { Sparkles } from "../sparks-section/sparks-section";

const SparklesBackground: FC = () => (
  <div
    className="relative -mt-32 h-80 w-screen overflow-hidden 
    [mask-image:radial-gradient(50%_50%,white,transparent)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] opacity-40" />
    <div
      className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[10%] 
      border-t border-[#163474] dark:bg-[#08132b]"
    />
    <Sparkles
      density={800}
      speed={1.2}
      size={1.2}
      direction="top"
      opacitySpeed={2}
      color="#32A7FF"
      className="absolute inset-x-0 bottom-0 h-full w-full"
    />
  </div>
);

export default SparklesBackground;
