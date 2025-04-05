import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { palette } from '~/styles/colors';

const colors = [palette.operating, palette.stopped, palette.maintenance];

export interface PieChartData {
  name: string;
  value: number;
  percentage: string;
}

interface PieChartProperties {
  data: PieChartData[];
}

export const PieChartComponent = ({ data }: PieChartProperties) => {
  return (
    <ResponsiveContainer width='50%' height={300}>
      <PieChart>
        <Pie
          dataKey='value'
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={90}
          label={({ name, percentage }) => `${name}: ${percentage}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string, entry: any) =>
            `${entry.payload.percentage}% (${value} horas)`
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
