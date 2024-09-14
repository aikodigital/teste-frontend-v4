import Chart from "react-apexcharts";

interface DataPoint {
  x: string;
  y: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: "line-chart",
    },
    xaxis: {
      categories: data.map((point) => point.x),
    },
  };

  const series = [
    {
      name: "Entradas de clientes",
      data: data.map((point) => point.y),
    },
  ];

  return <Chart options={options} series={series} type="line" height={450} />;
};

export default LineChart;
