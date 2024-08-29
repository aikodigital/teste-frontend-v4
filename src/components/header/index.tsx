"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function getMenuClasses() {
    let menuClasses = [];

    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "top-[60px]",
        "bg-primary",
        "w-full",
        "p-4",
        "left-0",
        "gap-5",
        "flex-col",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }

    return menuClasses.join(" ");
  }

  return (
    <nav
      className="bg-white shadow text-white p-5 sm:p-2 md:flex md:justify-between 
    md:items-center"
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <Image
            src="/img/aiko.png"
            alt="Logo"
            width={85}
            height={85}
            priority={true}
          />
        </a>
       
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12H16M-7 6H7"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
