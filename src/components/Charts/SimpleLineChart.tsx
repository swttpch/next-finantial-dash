'use client';

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
}

function SimpleLineChart({ chartColor, ...rest }: SimpleLineChartProps) {
  return (
    <Box {...rest}>
      <Line
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
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
