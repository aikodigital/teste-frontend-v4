import { NavigationLink } from '@/components/ButtonNavigation';
import TableMap from '@/components/TableMap';
import WrapperBox from '@/components/WrapperBox';
import WrapperFilter from '@/components/WrapperFilter';
import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" width={480} height={400} />,
});

export type Coordinates = {
  lat: number;
  lon: number;
};

export type TableProps = {
  result: {
    name: string;
    status: string;
    date: string;
    value: number;
    productivity: string;
  }[];
  overallResult: {
    name: string;
    value: number;
    productivity: string;
  };
};

type PageParams = {
  params: {
    id: string;
  };
};

export default async function Home({ params }: PageParams) {
  const responseMap = await fetch(`http://localhost:3000/api/filterMap?id=${params.id}`);
  const dataCoordinates = (await responseMap.json()) as Coordinates;

  const responseTable = await fetch(`http://localhost:3000/api/filterAllStates?id=${params.id}`);
  const dataTable = (await responseTable.json()) as TableProps;

  return (
    <>
      <NavigationLink titlePage='Mapa' />
      <section className="container mainContainer" style={{ marginTop: '16rem' }}>
        <WrapperBox dataTable={dataTable} />
        <WrapperFilter columns={2}>
          <DynamicMap lat={dataCoordinates.lat} lon={dataCoordinates.lon} />
          <TableMap data={dataTable} />
        </WrapperFilter>
      </section>
    </>
  );
}