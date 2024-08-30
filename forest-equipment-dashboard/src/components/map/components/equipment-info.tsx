import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useEquipment from '@/hooks/useEquipment';
import { Popup } from 'react-leaflet';
import { EquipmentInfoBadge } from './equipment-info-badge';
import { EquipmentHistorySheet } from './equipment-history-sheet';
import { GaugeIcon, MapPin } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EquipmentInfoProps {
  equipmentId: string;
}

function EquipmentInfo({ equipmentId }: EquipmentInfoProps) {
  const { getEquipmentInfo } = useEquipment();

  const infos = getEquipmentInfo(equipmentId);

  return (
    <Popup className="bg-background">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader>
          <CardTitle>{infos?.name}</CardTitle>
          <CardDescription>{infos?.modelName}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Percentual de Produtividade:</span>{' '}
            <span>{infos?.productivityPercentage ?? 0}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Ganho do equipamento:</span>{' '}
            <span>{infos?.gain ?? 0}</span>
          </div>
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
          <CardFooter className="flex w-full flex-col gap-2">
            <EquipmentHistorySheet equipmentId={equipmentId} />
            <Link
              href={`/position-history/${equipmentId}`}
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Ver histórico de posições
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </Popup>
  );
}

export { EquipmentInfo };
