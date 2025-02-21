import { FC } from "react";
import { Badge } from "../ui/badge";

const SkillBadge: FC<{ label: string }> = ({ label }) => (
  <Badge
    className="inline-block border bg-primary-dark 
    p-1 px-3 text-sm border-[#163474]"
  >
    {label}
  </Badge>
);

export default SkillBadge;