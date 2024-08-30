import { Badge } from '@/components/ui/badge';

interface StateBadgeProps {
  stateName: string;
  stateColor: string;
}

function StateBadge({ stateColor, stateName }: StateBadgeProps) {
  return (
    <Badge className="text-opacity-40" style={{ backgroundColor: stateColor }}>
      <span>{stateName}</span>
    </Badge>
  );
}

export { StateBadge };
