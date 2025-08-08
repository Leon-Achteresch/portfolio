import Image from "next/image";
import { Tilt } from "../ui/tilt";
import { FC } from "react";
import LogoImage from "@/assets/Images/logo.jpg";

const HeroTitle: FC = () => {
  return (
    <div className="relative flex flex-col items-center gap-6 mt-8">
      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     h-72 w-72 rounded-full bg-gradient-to-tr from-pink-500/60
                     via-purple-500/60 to-blue-500/60 blur-[32px]"
        />
        <div className="relative">
          <Tilt isRevese>
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr
                       from-pink-500/80 via-purple-500/80 to-blue-500/80
                       blur-md p-[2px]"
            />
            <div className="relative rounded-2xl bg-background/90 p-1">
              <Image
                src={LogoImage}
                alt="Leon Achteresch"
                width={250}
                height={250}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </Tilt>
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          Leon Achteresch
        </h1>
        <p className="bg-gradient-to-b from-foreground to-[#7b9cda] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Software Entwickler
        </p>
      </div>
    </div>
  );
};

export default HeroTitle;
