"use client";

import EquipmentItem from "./_components/equipment-item";
import Header from "./_components/header";

import equipments from '@/app/data/equipment.json';

const Home = () => {
  return (
    <main className="">
      <Header />
      <div className="px-5">
        <h1 className="text-lg font-bold mt-5">Meus Equipamentos</h1>
        <ul className="flex flex-col gap-2 w-full py-5">
          {equipments.map((equipment) => (
            <li className="w-full" key={equipment.id}>
              <EquipmentItem props={equipment} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
