'use client';

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

function ActivityGraphLineChart() {
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Line
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Incomes',
              data: [75, 69, 90, 91, 66, 65, 50],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4,
              xAxisID: 'x',
            },
            {
              label: 'Expenses',
              data: [55, 49, 70, 71, 46, 45, 30],
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.4,
              xAxisID: 'x',
            },
            {
              label: 'Balance',
              data: [85, 79, 100, 101, 76, 75, 60],
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.4,
              xAxisID: 'x',
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                maxTicksLimit: 3,
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                pointStyle: 'circle',
                usePointStyle: true,
              },
              position: 'bottom',
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
    </div>
  );
}

export default ActivityGraphLineChart;
