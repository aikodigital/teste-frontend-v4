"use client";

import { EarthIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../_lib/utils";

const Menu = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: EarthIcon, label: "Monitor" },
    { href: "/select-equipments", icon: MenuIcon, label: "Equipamentos" },
  ];
  return (
    <nav className="px-5 py-3 bg-white rounded-full border border-gray-300 shadow-md">
      <div className="flex items-center space-x-3 justify-between">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.href}
              className={"p-2 flex flex-col items-center"}
            >
              <Icon
                className={cn({
                  "text-primary": isActive,
                  "": !isActive,
                })}
                size={20}
              />
              <span
                className={cn("text-xs", {
                  "text-primary": isActive,
                  "": !isActive,
                })}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Menu;
