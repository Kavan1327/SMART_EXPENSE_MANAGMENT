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

const labels = ['PJ', 'SJ', 'MB', 'IS', 'DW', 'NJ', 'BS']

const data = {
  labels,
  datasets: [
    {
      label: 'Spend',
      data: [72, 68, 74, 58, 64, 32, 88],
      backgroundColor: '#22c55e',
      borderRadius: 6,
      barThickness: 24,
      maxBarThickness: 24,
      categoryPercentage: 0.6,
      barPercentage: 0.85,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f172a',
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
      grid: { color: 'rgba(255,255,255,0.06)' },
    },
  },
}

function TeamSpendingChart() {
  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.05)',
        height: '100%',
      }}
    >
      <CardContent sx={{ height: 320 }}>
        <Typography variant="h6" gutterBottom>
          Team Spending Trend
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  )
}

export default TeamSpendingChart
