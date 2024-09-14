import { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

import LineChart from "@/components/Charts";

const cityData = [
  { id: 1, cidade: "Tiros/MG" },
  { id: 2, cidade: "Aracatuba/SP" },
];


const generateRandomData = (numPoints: number) => {
  const data = [];
  for (let i = 1; i <= numPoints; i++) {
    data.push({
      x: String(i),
      y: Math.floor(Math.random() * 100) + 1,
    });
  }
  return data;
};

const data = generateRandomData(30);

const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-operacao-background">
        <PropagateLoader color="#00ff21" />
      </div>
    );
  }

  return (
    <div className="w-full bg-emerald-300 py-10 px-2 md:p-10">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-6">
        <div className="bg-white md:col-span-3 p-8 shadow-sm">
          <p className="py-4 font-semibold text-2xl text-gray-600">
            Gráficos - Setembro
          </p>
          <LineChart data={data} />
        </div>
        <div className="bg-white p-8 shadow-sm">
          <p className="py-4 font-semibold text-2xl text-gray-600">Produtos</p>
          <ul>
            {cityData.map((city) => (
              <li key={city.id}>{city.cidade}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
