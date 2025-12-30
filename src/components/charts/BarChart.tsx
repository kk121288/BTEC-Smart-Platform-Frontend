import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
  height?: number;
  horizontal?: boolean;
}

export function BarChart({ data, title, height = 300, horizontal = false }: BarChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ('y' as const) : ('x' as const),
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#00ffcc',
          font: {
            size: 12,
          },
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
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#888',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#888',
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar options={options} data={data} />
    </div>
  );
}
