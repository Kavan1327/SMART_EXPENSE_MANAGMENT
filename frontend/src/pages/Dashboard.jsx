import { Container, Grid } from '@mui/material'
import PendingTasksCard from '../components/PendingTasksCard'
import RecentExpensesTable from '../components/RecentExpensesTable'
import QuickAccessActions from '../components/QuickAccessActions'
import MonthlyReportSection from '../components/MonthlyReportSection'

function Dashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, md: 3 } }}>
      <Grid container columnSpacing={2.5} rowSpacing={2.5} alignItems="stretch">
        <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ display: 'flex' }}>
          <PendingTasksCard />
        </Grid>

        <Grid size={{ xs: 12, md: 7, lg: 8 }} sx={{ display: 'flex' }}>
          <RecentExpensesTable />
        </Grid>

        <Grid size={12}>
          <QuickAccessActions />
        </Grid>

        <Grid size={12}>
          <MonthlyReportSection />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
