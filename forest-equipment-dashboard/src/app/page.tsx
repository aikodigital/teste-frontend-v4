import { Skeleton } from '@/components/ui/skeleton';
import { useEquipment } from '@/hooks/useEquipment';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { FilterEquipments } from './_components/filter-equipments';

interface Props {
  searchParams: {
    model?: string;
    state?: string;
    equipment?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { getLatestLocations: getEquipmentLastPosition } = useEquipment();
  const { model = 'all', state = 'all', equipment = '' } = searchParams;

  const data = getEquipmentLastPosition(model, state, equipment);

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <Skeleton className="h-full w-full" />,
        ssr: false,
      }),
    [],
  );

  return (
    <main className="flex flex-col items-center space-y-4 py-12">
      <section className="bg-white-700 mx-auto w-10/12 max-w-screen-2xl">
        <FilterEquipments
          selectedModel={model}
          selectedState={state}
          selectedEquipment={equipment}
        />
      </section>

      <section className="bg-white-700 mx-auto h-[600px] w-10/12 max-w-screen-2xl">
        <Map data={data} />
      </section>
    </main>
  );
}
