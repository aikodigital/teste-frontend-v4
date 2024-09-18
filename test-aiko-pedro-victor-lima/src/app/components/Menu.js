// components/Sidebar.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Menu() {
  return (
    <div className="h-screen w-64 bg-[#E9E9E9] text-[#494949] ">
      <div className="flex justify-center px-2 mx-4 py-4 border-b-2 border-[#BDBDBD]">
        <Image
          src="/img/aiko.png"
          width={220}
          height={80}
        />
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <Link href="/" className="font-roboto  hover:font-bold">
            Histórico de posições
          </Link>
        </li>
        <li>
          <Link href="/states" className="font-roboto  hover:font-bold">
            Histórico de estado
          </Link>
        </li>
      </ul>
    </div>
  );
}
