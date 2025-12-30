import {
  AreaChart as RechartsArea,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: Array<Record<string, any>>;
  dataKeys: Array<{
    key: string;
    color: string;
    label: string;
  }>;
  title?: string;
  height?: number;
  stacked?: boolean;
}

export function AreaChart({ 
  data, 
  dataKeys, 
  title, 
  height = 300, 
  stacked = false 
}: AreaChartProps) {
  return (
    <div>
      {title && (
        <h3 className="text-cyan-400 font-bold text-lg mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsArea data={data}>
          <defs>
            {dataKeys.map((key) => (
              <linearGradient key={key.key} id={`gradient-${key.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={key.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={key.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid #00ffcc',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelStyle={{ color: '#00ffcc' }}
          />
          <Legend 
            wrapperStyle={{ color: '#00ffcc' }}
            iconType="circle"
          />
          {dataKeys.map((key) => (
            <Area
              key={key.key}
              type="monotone"
              dataKey={key.key}
              name={key.label}
              stroke={key.color}
              fill={`url(#gradient-${key.key})`}
              stackId={stacked ? '1' : undefined}
            />
          ))}
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  );
}
