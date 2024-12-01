import { useEffect, useState } from "react";
import { EquipmentPieChart } from "./_components/equipments-pie.chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EquipmentBarChart } from "./_components/equipments-bar.chart";
import { useAllData } from "@/hooks/use-all-data/use-all-data.hook";
import { EquipmentsStatesEnum } from "@/utils/enums/equipments.enums";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { allData } = useAllData();
  const [totalEquipments, setTotalEquipments] = useState<number>(0);
  const [operatingEquipments, setOperatingEquipments] = useState<number>(0);
  const [stoppedEquipments, setStoppedEquipments] = useState<number>(0);
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<number>(0);
  const [equipmentsModel, setEquipmentsModel] = useState<
    {
      model: string;
      quantity: number;
    }[]
  >([{ model: "", quantity: 0 }]);

  useEffect(() => {
    const { operating, stopped, maintenance, models } = allData.reduce(
      (acc, data) => {
        switch (data.state.name) {
          case EquipmentsStatesEnum.OPERATING:
            acc.operating += 1;
            break;
          case EquipmentsStatesEnum.STOPPED:
            acc.stopped += 1;
            break;
          case EquipmentsStatesEnum.MAINTENANCE:
            acc.maintenance += 1;
            break;
          default:
            break;
        }

        if (data.equipmentModel) {
          const modelIndex = acc.models.findIndex(
            (model) => model.model === data.equipmentModel?.name,
          );

          if (modelIndex === -1) {
            acc.models.push({ model: data.equipmentModel?.name, quantity: 1 });
          } else {
            acc.models[modelIndex].quantity += 1;
          }
        }

        return acc;
      },
      {
        operating: 0,
        stopped: 0,
        maintenance: 0,
        models: [] as { model: string; quantity: number }[],
      },
    );

    setTotalEquipments(allData.length);
    setOperatingEquipments(operating);
    setStoppedEquipments(stopped);
    setMaintenanceEquipments(maintenance);
    setEquipmentsModel(models);
  }, [allData]);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <Button variant={"default"} className="m-4">
        <Link to={"/"}>Ir para o mapa</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 w-full overflow-x-auto">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-6xl">{totalEquipments}</div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Operando</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-6xl text-[#2ecc71]">
                {operatingEquipments}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Parados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-6xl text-[#f1c40f]">{stoppedEquipments}</div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Manutenção</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-6xl text-[#e74c3c]">
                {maintenanceEquipments}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 md:col-span-2">
          <EquipmentPieChart />
        </div>
        <div className="col-span-2 md:col-span-2">
          <EquipmentBarChart data={equipmentsModel} />
        </div>
      </div>
    </div>
  );
}
