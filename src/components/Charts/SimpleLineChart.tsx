'use client';

import { TransactionType } from '@/types/transaction.types';
import { Box, BoxProps } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SimpleLineChartProps extends BoxProps {
  chartColor: string;
  data: TransactionType[];
}

function SimpleLineChart({ chartColor, data, ...rest }: SimpleLineChartProps) {
  return (
    <Box {...rest}>
      <Line
        data={{
          labels: data.map((item) => item.date),
          datasets: [
            {
              label: '',
              data: data.map((item) => item.amount),
              fill: false,
              borderColor: chartColor,
              tension: 0.4,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
            title: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </Box>
  );
}

export default SimpleLineChart;
