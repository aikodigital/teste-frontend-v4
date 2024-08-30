import { useEquipment } from '@/hooks/useEquipment';
import { PositionsList } from './_components/positions-list';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterPositions } from './_components/filter-positions';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface Props {
  params: {
    equipmentId: string;
  };
  searchParams: {
    lat?: string;
    lon?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

export default function Page({ params, searchParams }: Props) {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <Skeleton className="h-full w-full" />,
        ssr: false,
      }),
    [],
  );

  const { equipmentId } = params;
  const { getPositionHistory, getInfo: getEquipmentInfo } = useEquipment();
  const { lat = '', lon = '', sortOrder = 'desc' } = searchParams;

  const positionHistory = getPositionHistory(equipmentId);
  const equipmentInfo = getEquipmentInfo(equipmentId);

  const getPositions = () => {
    if (!lat.trim() || !lon.trim()) {
      const position = positionHistory?.positions.at(
        positionHistory?.positions.length - 1,
      );
      return position ? [position] : [];
    }

    const positions = positionHistory?.positions.filter((position) => {
      const latFormatted = Number(lat);
      const lonFormatted = Number(lon);
      return position.lat === latFormatted && position.lon === lonFormatted;
    });

    return positions;
  };

  const positions = getPositions();

  const formattedPositions = positions?.map((position) => ({
    position,
    equipmentId,
    modelName: equipmentInfo.modelName,
  }));

  return (
    <main className="flex flex-col items-center space-y-4 py-12">
      <div className="mx-auto w-10/12 max-w-screen-2xl">
        <Link href="/" className={buttonVariants({ variant: 'outline' })}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>
      </div>
      <section className="mx-auto w-10/12 max-w-screen-2xl gap-2">
        <div className="w-full space-y-4">
          <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            {equipmentInfo.name} - {equipmentInfo.modelName}
          </h2>
          <span className="text-base text-muted-foreground">
            Selecione a posição do histórico que deseja visualizar
          </span>
        </div>
      </section>
      <section className="mx-auto w-10/12 max-w-screen-2xl space-y-2">
        <FilterPositions sortOrder={sortOrder} />
        <div className="flex gap-4">
          <div className="w-full basis-1/4">
            <PositionsList
              data={positionHistory}
              sortOrder={sortOrder}
              selectedPosition={{ lat, lon }}
            />
          </div>

          <div className="h-[calc(100vh-200px)] w-full basis-3/4">
            <Map data={formattedPositions ?? []} disablePopup />
          </div>
        </div>
      </section>
    </main>
  );
}
