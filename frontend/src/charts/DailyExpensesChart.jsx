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

const labels = ['Accomodation', 'Comms', 'Services', 'Food', 'Fuel']

const data = {
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: [18, 8, 32, 24, 10],
      backgroundColor: '#a855f7',
      borderRadius: 6,
      barThickness: 22,
      maxBarThickness: 22,
      categoryPercentage: 0.58,
      barPercentage: 0.82,
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

function DailyExpensesChart() {
  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.05)',
        height: '100%',
      }}
    >
      <CardContent sx={{ height: 320 }}>
        <Typography variant="h6" gutterBottom>
          Day-to-Day Expenses
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  )
}

export default DailyExpensesChart
