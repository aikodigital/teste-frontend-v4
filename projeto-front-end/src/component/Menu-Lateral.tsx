import React from "react";
import { FaHome, FaBars } from 'react-icons/fa';

export default function Menu() {
  return (
    <div className="z-0 w-16 h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center shadow-md fixed top-0 left-0">
      <div className="mt-4 p-2 text-gray-700 hover:text-blue-500 cursor-pointer">
        <FaBars size={24} />
      </div>
      <div className="mt-8 p-2 text-gray-700 hover:text-blue-500 cursor-pointer">
        <FaHome size={24} />
      </div>
    </div>
  );
}
