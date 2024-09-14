import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Notification from "../assets/notification.svg";

import { Button } from "./ui/button";
import { HomeIcon, MapIcon, MenuSquare } from "lucide-react";
import { useAuth } from "@/context/authContext";

export function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarVisible, setSidebarVisible] = useState(true);

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-green-200 py-4 w-full px-6 flex">
        <div className="w-[15%]">
          <div className="w-full flex items-center justify-center">
            <span className="text-green-600 font-bold text-base md:text-3xl">
              Aiko
            </span>
          </div>
        </div>
        <div className="w-[85%] flex items-center justify-between">
          <Button onClick={toggleSidebar}>
            <MenuSquare className="text-emerald-950" />
          </Button>
          <div className="flex items-center">
            <div>
              <img src={Notification} alt="" />
            </div>
            <div className="mx-2 h-6 w-[2px] bg-gray-300" />
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://github.com/dev-lops.png"
                alt=""
              />
              <div className="flex items-center justify-center mx-3">
                <p>Anderson lopes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div
          className={` ${
            sidebarVisible
              ? "fixed inset-0 bg-white px-6 w-full flex flex-col justify-between md:relative md:w-[20%] md:flex md:flex-col md:justify-between z-50"
              : "hidden"
          }`}
        >
          <div>
            <div className="py-10 w-full flex items-center justify-between">
              <p className="font-semibold font-inter text-xs text-operacao-gray-color-80"></p>
              <Button
                className="flex md:hidden"
                onClick={toggleSidebar}
              ></Button>
            </div>
            <div className="flex flex-col gap-4 text-center align-center font-bold">
              <div className="flex justify-start align-center text-center w-full">
                <Button
                  title="Pagina inicial"
                  onClick={() => navigate("/")}
                  className="flex "
                >
                  <HomeIcon className="" />
                  <span className="text-green-600 text-xl">- Home</span>
                </Button>
              </div>
              <div className="flex justify-start align-center text-center w-full">
                <Button
                  title="Ver no Mapa"
                  onClick={() => navigate("/mapview")}
                  className="flex "
                >
                  <MapIcon />
                  <span className="text-green-600 text-xl">-Ver no Mapa</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="py-10 w-full flex items-center justify-center align-center">
            <Button
              variant="secondary"
              type="button"
              className="bg-red-200 text-red font-semibold text-xs underline "
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
        <div
          className={` ${
            sidebarVisible ? "w-[85%]" : "w-full"
          } bg-operacao-background overflow-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
