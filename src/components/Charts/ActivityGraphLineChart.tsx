'use client';

import { getCurrencyValue } from '@/helpers/getCurrencyValue';
import { TransactionType } from '@/types/transaction.types';
import { useToken } from '@chakra-ui/react';
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

interface ActivityGraphLineChartProps {
  incomes: Array<TransactionType>;
  incomesColor: string;
  expenses: Array<TransactionType>;
  expensesColor: string;
}
function ActivityGraphLineChart({
  incomes,
  expenses,
  expensesColor,
  incomesColor,
}: ActivityGraphLineChartProps) {
  const colorToken = useToken('colors', [incomesColor, expensesColor]);
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Line
      data={{
        labels: incomes.map((item) => new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })),
        datasets: [
        {
          label: 'Incomes',
          data: incomes.map((item) => getCurrencyValue(item.amount)),
          fill: false,
          borderColor: colorToken[0],
          tension: 0.4,
          xAxisID: 'x',
        },
        {
          label: 'Expenses',
          data: expenses.map((item) => getCurrencyValue(item.amount)),
          fill: false,
          borderColor: colorToken[1],
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
          ticks: {
          display: false,
          },
        },
        y: {
          ticks: {
          maxTicksLimit: 3,
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
