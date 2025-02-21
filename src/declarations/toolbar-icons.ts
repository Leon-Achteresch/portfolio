import MailImage from "@/assets/Images/mail.webp";
import PhoneImage from "@/assets/Images/phone.webp";
import GithubImage from "@/assets/Images/github.png";
import LogoImage from "@/assets/Images/logo.png";
import CVImage from "@/assets/Images/CV.jpg";
import { IconData } from "@/types/toolbar.types";

export const icons: IconData[] = [
  {
    id: "phone",
    imgSrc: PhoneImage,
    label: "Kontakt aufnehmen",
  },
  {
    id: "mail",
    imgSrc: MailImage,
    href: "mailto:leon.achteresch@gmail.com",
    label: "E-Mail senden",
  },
  {
    id: "github",
    imgSrc: GithubImage,
    href: "https://github.com/Leon-Achteresch",
    label: "GitHub-Profil",
    withoutBackground: true,
  },
  {
    id: "cv",
    imgSrc: CVImage,
    label: "Lebenslauf anzeigen",
    href: "/CV.pdf",
  },
  {
    id: "logo",
    imgSrc: LogoImage,
    label: "Meine Website",
    href: "/",
  },
];