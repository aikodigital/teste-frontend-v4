import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useEquipment from '@/hooks/useEquipment';
import { Popup } from 'react-leaflet';
import { EquipmentInfoBadge } from './equipment-info-badge';
import { EquipmentHistorySheet } from './equipment-history-sheet';
import { GaugeIcon } from 'lucide-react';

interface EquipmentInfoProps {
  equipmentId: string;
}

function EquipmentInfo({ equipmentId }: EquipmentInfoProps) {
  const { getEquipmentInfo } = useEquipment();

  const infos = getEquipmentInfo(equipmentId);

  return (
    <Popup className="bg-background">
      <Card className="w-full max-w-md border-none">
        <CardHeader>
          <CardTitle>{infos?.name}</CardTitle>
          <CardDescription>{infos?.modelName}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GaugeIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Estado:</span>
            </div>
            <EquipmentInfoBadge
              stateColor={infos?.state?.color ?? '#000'}
              stateName={infos?.state?.name ?? 'Não definido'}
            />
          </div>
          <EquipmentHistorySheet equipmentId={equipmentId} />
        </CardContent>
      </Card>
    </Popup>
  );
}

export { EquipmentInfo };
