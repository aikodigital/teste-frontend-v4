import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Home from "../../assets/home.svg";
import Map from "../../assets/map.svg";
import MenuLeft from "../../assets/menu-left.svg";
import Notification from "../../assets/notification.svg";
import ArrowDown from "../../assets/arrow-down-1.svg";
import User from "../../assets/user.jpeg";
import { ButtonMenu } from "../ButtonMenu";
import { useAuth } from "../../context/authContext";

export const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="tw-flex tw-flex-col tw-h-screen">
      <div className="tw-bg-white tw-py-4 tw-w-full tw-px-6 tw-flex">
        <div className="tw-w-[15%]">
          <div className="tw-w-full tw-flex tw-items-center tw-justify-center">
            <span className="tw-text-green-600 tw-font-bold tw-text-base md:tw-text-3xl">
              Operação Florestal
            </span>
          </div>
        </div>
        <div className="tw-w-[85%] tw-flex tw-items-center tw-justify-between">
          <img src={MenuLeft} alt="" onClick={toggleSidebar} />
          <div className="tw-flex tw-items-center">
            <div>
              <img src={Notification} alt="" />
            </div>
            <div className="tw-mx-2 tw-h-6 tw-w-[2px] tw-bg-gray-300" />
            <div className="tw-flex tw-items-center">
              <img
                className="tw-w-12 tw-h-12 tw-rounded-full"
                src={"https://avatars.githubusercontent.com/u/98537031?v=4"}
                alt=""
              />
              <div className="tw-flex tw-items-center tw-justify-center tw-mx-3">
                <p>Pablo Kauê</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-flex tw-flex-1">
        <div
          className={` ${
            sidebarVisible
              ? "tw-fixed tw-inset-0 tw-bg-white tw-px-6 tw-w-full tw-flex tw-flex-col tw-justify-between md:tw-relative md:tw-w-[15%] md:tw-flex md:tw-flex-col md:tw-justify-between tw-z-50"
              : "tw-hidden"
          }`}
        >
          <div>
            <div className="tw-py-10 tw-w-full tw-flex tw-items-center tw-justify-between">
              <p className="tw-font-semibold tw-font-inter tw-text-xs tw-text-operacao-gray-color-80">
                PRINCIPAL
              </p>
              <div className="tw-flex md:tw-hidden" onClick={toggleSidebar}>
                X
              </div>
            </div>
            <div>
              <div>
                <ButtonMenu
                  title="Pagina inicial"
                  icon={Home}
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="tw-py-9">
                <ButtonMenu
                  title="Ver no Mapa"
                  icon={Map}
                  onClick={() => navigate("/mapsshop")}
                />
              </div>
            </div>
          </div>
          <div className="tw-py-9 tw-w-full tw-flex tw-items-center tw-justify-center">
            <button
              className="tw-text-operacao-brand-color-red tw-font-semibold tw-text-xs tw-underline"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
        <div
          className={` ${
            sidebarVisible ? "tw-w-[85%]" : "tw-w-full"
          } tw-bg-operacao-background tw-overflow-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
