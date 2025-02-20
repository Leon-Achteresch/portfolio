import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import RobotImage from "@/assets/Images/robot.png";
import PhoneImage from "@/assets/Images/phone.webp";
import GithubImage from "@/assets/Images/github.png";
import LogoImage from "@/assets/Images/logo.png";
import CVImage from "@/assets/Images/CV.jpg";

export function Dock() {
  return (
    <div className="relative w-full" id="dock">
      <div className="-translate-x-1/2 fixed bottom-2 left-1/2 mx-auto max-w-full transform-gpu pt-4">
        <div className="relative ">
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-[72px] max-w-full rounded-3xl border border-gray-200/60 bg-gray-200/60 shadow-sm dark:border-gray-600/60 dark:bg-gray-800/60" />
          <div className="flex items-end overflow-x-auto rounded-3xl pl-2">
            <AppIcon imgSrc={PhoneImage} />
            <AppIcon imgSrc={GithubImage} withoutBackground={true} />
            <Link href="https://www.modul.day" target="_blank">
              <AppIcon imgSrc={RobotImage} />
            </Link>
            <AppIcon imgSrc={CVImage} />
            <AppIcon
              imgSrc={LogoImage}
              // withoutBackground={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dock;

function AppIcon({
  imgSrc,
  withoutBackground,
}: Readonly<{
  imgSrc: string | StaticImageData;
  withoutBackground?: boolean;
}>) {
  return (
    <div className=" group z-20 grid w-fit cursor-pointer place-items-center p-2 pl-0">
      <div
        className={cn(
          "pointer-events-none z-20 inline size-14 transform-gpu overflow-hidden rounded-2xl bg-white shadow-inner transition-all duration-200 group-hover:size-[4rem] group-hover:shadow-sm dark:bg-gray-800",
          withoutBackground ? "p-2" : ""
        )}
      >
        <Image
          alt="dock"
          className={cn(
            "size-full",
            withoutBackground ? "object-contain" : "object-cover"
          )}
          height={256}
          src={imgSrc}
          width={256}
        />
      </div>
    </div>
  );
}
