import { Badge } from '@/components/ui/badge';

interface EquipmentInfoBadgeProps {
  stateName: string;
  stateColor: string;
}

function EquipmentInfoBadge({
  stateColor,
  stateName,
}: EquipmentInfoBadgeProps) {
  return (
    <Badge className="text-opacity-40" style={{ backgroundColor: stateColor }}>
      <span>{stateName}</span>
    </Badge>
  );
}

export { EquipmentInfoBadge };
