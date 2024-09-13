import React, { useState } from "react";
import ProfileUser from "../assets/profile-2user.svg";
import Map from "../assets/map-2.svg";
import Cpu from "../assets/cpu.svg";
import Building from "../assets/building.svg";
import ArrowTop from "../assets/arrow-top2.svg";
import ArrowDown from "../assets/arrow-down-red.svg";
import Minus from "../assets/minus-square.svg";
import LineChart from "../components/Charts";

export const Main = () => {
  const [list, setList] = useState([
    {
      id: 1,
      icon: ProfileUser,
      title: "Total de operadores",
      subtitle: "Crescimento de",
      valuesubtitle: "10%",
      colorsubtitle: "tw-text-operacao-brand-color-green",
      iconsubtitle: ArrowTop,
      value: "+12mil",
    },
    {
      id: 2,
      icon: Map,
      title: "Total de cidades",
      subtitle: "Constância de",
      valuesubtitle: "10%",
      colorsubtitle: "tw-text-operacao-brand-color-yellow",
      iconsubtitle: Minus,
      value: "106",
    },
    {
      id: 3,
      icon: Cpu,
      title: "Total de assinaturas",
      subtitle: "Crescimento de",
      valuesubtitle: "10%",
      colorsubtitle: "tw-text-operacao-brand-color-green",
      iconsubtitle: ArrowTop,
      value: "+13mil",
    },
    {
      id: 4,
      icon: Building,
      title: "Total de parceiros",
      subtitle: "Declinação de",
      valuesubtitle: "02%",
      colorsubtitle: "tw-text-operacao-brand-color-red",
      iconsubtitle: ArrowDown,
      value: "134",
    },
  ]);

  const [listCity, setListCity] = useState([
    {
      id: 1,
      cidade: "Tiros/MG",
    },
   
  ]);

  const generateRandomData = (numPoints: number) => {
    const data = [];
    for (let i = 1; i <= numPoints; i++) {
      const point = {
        x: String(i),
        y: Math.floor(Math.random() * 100) + 1,
      };
      data.push(point);
    }
    return data;
  };

  const data = generateRandomData(30);

  return (
    <div className="tw-w-full tw-bg-operacao-background tw-py-10 tw-px-2 md:tw-p-10">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-4">
        {list.map((item) => (
          <div
            key={item.id}
            className="tw-bg-white tw-p-8 tw-rounded-md tw-shadow-sm tw-flex"
          >
            <div className="tw-w-[60%]">
              <img src={item.icon} alt="" />
              <p className="tw-mt-1 tw-mb-1 tw-font-semibold tw-text-base ">
                {item.title}
              </p>
              <div>
                <div className="tw-font-medium tw-text-sm tw-flex tw-items-center">
                  {item.subtitle}
                  <div className="tw-flex tw-ml-0.5 tw-items-center">
                    <p className={`${item.colorsubtitle}`}>
                      {item.valuesubtitle}
                    </p>
                    <img src={item.iconsubtitle} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-justify-end tw-w-[40%]">
              <p className="tw-font-bold tw-text-3xl ">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tw-grid lg:tw-grid-cols-4 tw-grid-cols-1 tw-gap-4 tw-mt-6">
        <div className="tw-bg-white md:tw-col-span-3 tw-p-8 tw-shadow-sm">
          <p className="tw-py-4 tw-font-semibold tw-text-2xl tw-text-operacao-gray-color-80">
            Gráficos - Agosto
          </p>
          <LineChart data={data} />
        </div>
        <div className="tw-bg-white tw-p-8 tw-shadow-sm">
          <p className="tw-py-4 tw-font-semibold tw-text-2xl tw-text-operacao-gray-color-80">
            Ranking de cidades
          </p>
          <div className="tw-relative tw-overflow-x-auto">
            <table className="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 dark:tw-text-gray-400">
              <thead className="tw-text-xs tw-text-gray-700 tw-uppercase ">
                <tr>
                  <th scope="col" className="tw-px-6 tw-py-3">
                    Cidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {listCity.map((item) => (
                  <tr
                    key={item.id}
                    className="tw-bg-white tw-border-b tw-border-operacao-gray-color-20"
                  >
                    <th
                      scope="row"
                      className="tw-px-6 tw-py-4 tw-font-medium tw-whitespace-nowrap tw-text-operacao-gray-color-100"
                    >
                      {item.cidade}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
