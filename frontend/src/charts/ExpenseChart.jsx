import { Card, CardContent, Typography } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend)

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: [12, 14, 11, 16, 18, 17, 19, 20, 18, 17, 19, 21],
      backgroundColor: '#22c55e',
      borderRadius: 6,
    },
    {
      label: 'Expenses',
      data: [9, 10, 12, 11, 13, 12, 14, 13, 12, 11, 12, 13],
      backgroundColor: '#4ade80',
      borderRadius: 6,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#e5e7eb',
        boxWidth: 12,
      },
    },
    tooltip: {
      backgroundColor: '#111827',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: '#cbd5e1' },
      grid: { display: false },
    },
    y: {
      ticks: { color: '#cbd5e1' },
      grid: { color: 'rgba(255,255,255,0.04)' },
    },
  },
}

function ExpenseChart() {
  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <CardContent sx={{ height: 360 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Monthly money flow showing income and expenses.
        </Typography>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  )
}

export default ExpenseChart
