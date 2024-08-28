import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import equipment from "@/app/data/equipment.json";
import equipmentModel from "@/app/data/equipmentModel.json";
import equipmentPositionHistory from "@/app/data/equipmentPositionHistory.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import Menu from "./_components/menu";

const DynamicMap = dynamic(() => import("./_components/map"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="h-[100vh] w-[100vw]">
        <div className="fixed z-50 left-3 top-3 w-[100px] h-[50px]">
          <Image
            src="/aiko.png"
            alt="Logo"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: "auto", height: "auto" }}
            width={100}
            height={50}
          />
        </div>
        <div className="z-10">
          <DynamicMap
            equipment={equipment}
            equipmentPositionHistory={equipmentPositionHistory}
            equipmentModel={equipmentModel}
            equipmentStateHistory={equipmentStateHistory}
          />
        </div>
      </section>
      <div className="z-50 fixed bottom-3 left-auto right-auto">
        <Menu />
      </div>
    </main>
  );
};

export default Home;
