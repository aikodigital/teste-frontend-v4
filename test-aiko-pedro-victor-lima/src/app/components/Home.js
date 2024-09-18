// pages/index.js
import Menu from './Menu';
import { DataProvider } from '../context/DataContext';
import Main from './Main';

export default function Home() {
  return (
    <DataProvider>
      <div className='flex flex-cols-2'>
        <Menu />
        <div className="w-full col-start-2 col-span-2">
          <Main />
        </div>
      </div>
    </DataProvider>
  );
}
