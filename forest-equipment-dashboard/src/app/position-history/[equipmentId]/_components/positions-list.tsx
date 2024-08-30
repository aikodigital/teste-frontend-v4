'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IEquipmentsPositionHistory } from '../../../../../@types/equipment';
import { format } from 'date-fns';
import { useRouter } from '@/hooks/useRouter';
import { cn } from '@/lib/utils';

interface PositionsListProps {
  data: IEquipmentsPositionHistory | undefined;
  sortOrder: 'asc' | 'desc';
  selectedPosition: {
    lat: string;
    lon: string;
  };
}

function PositionsList({
  data,
  sortOrder,
  selectedPosition,
}: PositionsListProps) {
  const positions = data?.positions.sort((a, b) => {
    const dateA = new Date(a?.date ?? '').getTime();
    const dateB = new Date(b?.date ?? '').getTime();

    if (sortOrder === 'desc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  const { navigate } = useRouter();

  return (
    <ScrollArea className="w-96 whitespace-nowrap lg:h-[calc(100vh-200px)] lg:w-full">
      <div className="flex w-max gap-4 lg:grid">
        {positions?.map((position) => (
          <div
            key={position.date}
            className={cn(
              'grid cursor-pointer grid-cols-2 gap-4 rounded-md bg-muted/50 p-4 transition hover:bg-muted/40',
              String(position.lat) === selectedPosition.lat &&
                String(position.lon) === selectedPosition.lon &&
                'bg-primary text-secondary hover:bg-primary/80',
            )}
            onClick={() =>
              navigate([
                { lat: String(position.lat), lon: String(position.lon) },
              ])
            }
          >
            <div className="text-muted-foreground">
              <span className="text-base">Latitude:</span>
            </div>
            <div>
              <span className="text-sm">{position?.lat}</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-base">Longitude:</span>
            </div>
            <div>
              <span className="text-sm">{position?.lon}</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-base">Data: </span>
            </div>
            <div>
              <span className="text-sm">
                {format(position?.date ?? '', 'dd/MM/yyyy HH:mm')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export { PositionsList };
