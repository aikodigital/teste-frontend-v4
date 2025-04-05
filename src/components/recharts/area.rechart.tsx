import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { palette } from '~/styles/colors';

export interface AreaChartData {
  date: string;
  valueGenerated: number;
}

interface AreaChartProperties {
  data: AreaChartData[];
}

export const AreaChartComponent = ({ data }: AreaChartProperties) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip
          formatter={(val: number) => [`R$ ${val.toFixed(2)}`, 'Valor gerado']}
        />
        <Area
          type='monotone'
          dataKey='valueGenerated'
          stroke={palette.chart}
          fill={palette.chart}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
