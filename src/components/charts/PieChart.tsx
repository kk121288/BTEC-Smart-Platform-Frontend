import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
  height?: number;
  donut?: boolean;
}

export function PieChart({ data, title, height = 300, donut = false }: PieChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#00ffcc',
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
      title: {
        display: !!title,
        text: title || '',
        color: '#00ffcc',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ffcc',
        bodyColor: '#fff',
        borderColor: '#00ffcc',
        borderWidth: 1,
      },
    },
  };

  const ChartComponent = donut ? Doughnut : Pie;

  return (
    <div style={{ height }}>
      <ChartComponent options={options} data={data} />
    </div>
  );
}
