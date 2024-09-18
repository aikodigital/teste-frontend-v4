"use client";
import MapComponent from "@/components/mapa/MapComponent";
import useEquipmentStore from "../store/useEquipmentStore";
import Image from "next/image"; // Para o logo do projeto
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Certifique-se de que o caminho está correto
import {
  BadgeDollarSign,
  MapPin,
  Wrench, // Substituí por Wrench
  Percent,
  Settings,
} from "lucide-react"; // Certifique-se de que Lucide React está instalado corretamente

const HomePage = () => {
  const { countEquipmentsInState } = useEquipmentStore();

  const equipmentsInOperation = countEquipmentsInState("Operando");
  const equipmentsInMaintenance = countEquipmentsInState("Manutenção");
  const equipmentsStopped = countEquipmentsInState("Parado");

  return (
    <main className="sm:ml-14 p-4">
      {/* Título do Projeto com Ícone */}
      <header className="flex items-center mb-6">
        <Image
          src="/images/aiko.png"
          alt="Logo do Projeto"
          width={50}
          height={50}
        />
        {/* Ajustando o estilo do título */}
        <h1 className="ml-4 text-2xl font-semibold text-gray-800 tracking-wide">
          Projeto Aiko
        </h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cards ao lado do mapa */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-md sm:text-lg text-gray-800 select-none">
                  Equipamentos em Operação
                </CardTitle>
                <Wrench className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Total de equipamentos operando</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">
                {equipmentsInOperation}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-md sm:text-lg text-gray-800 select-none">
                  Equipamentos em Manutenção
                </CardTitle>
                <Settings className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>
                Total de equipamentos em manutenção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">
                {equipmentsInMaintenance}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-md sm:text-lg text-gray-800 select-none">
                  Equipamentos Parados
                </CardTitle>
                <Percent className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Total de equipamentos parados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">
                {equipmentsStopped}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mapa ocupando o restante do espaço */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-md sm:text-lg text-gray-800 select-none">
                  Equipamentos Detalhados e Mapa
                </CardTitle>
                <MapPin className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>
                Detalhes de cada equipamento e mapa
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mapa de Equipamentos */}
              <div className="h-[500px]">
                <MapComponent />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
