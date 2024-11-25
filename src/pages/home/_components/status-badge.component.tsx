import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  text: string;
  color: string;
}
export function StatusBadge({ text, color }: StatusBadgeProps) {
  return (
    <Badge
      className={
        "hover:opacity-100 opacity-100 text-sm w-max min-w-[100px] flex items-center justify-center"
      }
      style={{ backgroundColor: color }}
    >
      {text}
    </Badge>
  );
}
