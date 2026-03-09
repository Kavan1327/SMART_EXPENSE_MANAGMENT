import { Grid, Typography, Box } from '@mui/material'
import TeamSpendingChart from '../charts/TeamSpendingChart'
import DailyExpensesChart from '../charts/DailyExpensesChart'

function MonthlyReportSection() {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Monthly Report
      </Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TeamSpendingChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DailyExpensesChart />
        </Grid>
      </Grid>
    </Box>
  )
}

export default MonthlyReportSection
