import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Modelo de equipamento",
  },
  quantity: {
    label: "Quantidade",
  },
} as ChartConfig;

interface IEquipmentBarChart {
  data: {
    model: string;
    quantity: number;
  }[];
}
export function EquipmentBarChart({ data }: IEquipmentBarChart) {
  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Modelos de Equipamentos</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[248px] w-full"
          >
            <BarChart
              data={data}
              margin={{
                left: 0,
                right: 0,
                top: 18,
                bottom: 18,
              }}
              barSize={90}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="model"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <Bar
                dataKey="quantity"
                fill="#333333"
                label={{ position: "top", fontSize: 18 }}
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
