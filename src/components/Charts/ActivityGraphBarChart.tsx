'use client';

import { getCurrencyValue } from '@/helpers/getCurrencyValue';
import { ActivityGraphLineChartProps } from '@/types/charts.types';
import { useToken } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

function ActivityGraphLineChart({
  expensesColor,
  incomesColor,
  balanceColor,
  oldBalanceColor,
  data,
}: ActivityGraphLineChartProps) {
  const colorToken = useToken('colors', [
    incomesColor,
    expensesColor,
    balanceColor,
    oldBalanceColor,
  ]);
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Bar
        data={{
          labels: data.map((item) =>
            new Date(item.date).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }),
          ),
          datasets: [
            {
              label: 'Old Balance',
              data: data.map((item) => getCurrencyValue(item.old_balance)),
              backgroundColor: colorToken[3],
              xAxisID: 'x',
              stack: 'Stack 0',
            },
            {
              label: 'Incomes',
              data: data.map((item) => getCurrencyValue(item.incomes)),
              backgroundColor: colorToken[0],
              stack: 'Stack 1',
              xAxisID: 'x',
            },
            {
              label: 'Expenses',
              data: data.map((item) => getCurrencyValue(item.expenses) * -1),
              backgroundColor: colorToken[1],
              xAxisID: 'x',
              stack: 'Stack 1',
            },
            {
              label: 'Balance',
              data: data.map((item) => getCurrencyValue(item.value)),
              backgroundColor: colorToken[2],
              xAxisID: 'x',
              stack: 'Stack 2',
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
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                callback: function (value) {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(value));
                },
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
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(context.parsed.y);
                  }
                  return label;
                },
              },
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
