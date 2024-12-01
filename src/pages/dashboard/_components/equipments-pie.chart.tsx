import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAllEquipmentHistory } from "@/hooks/use-all-states/use-all-states.hook";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function EquipmentPieChart() {
  const { data } = useAllEquipmentHistory();

  // Process the data for the expected format by the chart
  const processedData = useMemo(() => {
    if (!data) return [];

    // Group equipment per state
    const stateCounts: Record<
      string,
      { name: string; color: string; count: number }
    > = {};

    data.forEach((equipment) => {
      const lastHistoryEntry = equipment.history.at(-1); // Last state in the historical
      const lastState = lastHistoryEntry?.state;

      if (!lastState) return; // Ignore Equipment Without State

      if (!stateCounts[lastState.id]) {
        stateCounts[lastState.id] = {
          name: lastState.name,
          color: lastState.color,
          count: 0,
        };
      }

      stateCounts[lastState.id].count++;
    });

    return Object.values(stateCounts).map((state) => ({
      status: state.name,
      count: state.count,
      fill: state.color,
    }));
  }, [data]);

  return (
    <div className="w-full h-full">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="w-full items-start">Equipamentos</CardTitle>
          <CardDescription className="w-full items-start">
            Amostra geral do estado dos equipamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={processedData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
          <CardFooter className="flex-row gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-[#2ecc71]" />
              Operando
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-[#f1c40f]" />
              Parado
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-[#e74c3c]" />
              Manutenção
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
