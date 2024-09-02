import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./home/page'), {
  ssr: false,
});

export default function Page(){
  return <>
    <Home />
  </>
}; 