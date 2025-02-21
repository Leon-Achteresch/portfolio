import { StaticImageData } from "next/image";

export type IconData = {
  id: string;
  imgSrc: string | StaticImageData;
  href?: string;
  label: string;
  withoutBackground?: boolean;
};
