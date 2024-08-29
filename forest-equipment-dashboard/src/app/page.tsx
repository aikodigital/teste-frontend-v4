import { Skeleton } from '@/components/ui/skeleton';
import useEquipment from '@/hooks/useEquipment';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default async function Home() {
  const { getEquipmentLastPosition } = useEquipment();

  const data = getEquipmentLastPosition;

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <Skeleton className="h-full w-full" />,
        ssr: false,
      }),
    [],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white-700 mx-auto my-5 h-[600px] w-[98%]">
        <Map data={data} />
      </div>
    </main>
  );
}
