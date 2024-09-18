"use client"
import Menu from '../components/Menu';
import MainState from '../components/MainState';
import { DataProvider } from '../context/DataContext';
import { Main } from 'next/document';

export default function State() {
  return (
    <DataProvider>
      <div className='flex flex-cols-2'>
        <Menu />
        <div className="w-full col-start-2 col-span-2">
          <MainState />
        </div>
      </div>
    </DataProvider>
  );
}