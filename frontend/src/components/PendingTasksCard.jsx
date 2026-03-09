import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import EventUpcomingRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded'

const tasks = [
  { label: 'Pending Approvals', count: 5, icon: PendingActionsRoundedIcon, color: '#8b5cf6' },
  { label: 'New Trips Registered', count: 1, icon: FlightTakeoffRoundedIcon, color: '#22c55e' },
  { label: 'Unreported Expenses', count: 4, icon: ReceiptLongRoundedIcon, color: '#eab308' },
  { label: 'Upcoming Expenses', count: 0, icon: EventUpcomingRoundedIcon, color: '#38bdf8' },
  { label: 'Unreported Advances', count: '€0.00', icon: CreditScoreRoundedIcon, color: '#f43f5e' },
]

function PendingTasksCard() {
  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.05)',
        height: '100%',
        width: '100%',
      }}
    >
      <CardHeader
        title="Pending Tasks"
        sx={{
          pb: 0,
          px: 2.5,
          '& .MuiCardHeader-title': {
            fontWeight: 700,
          },
        }}
      />
      <List sx={{ py: 0, px: 2 }}>
        {tasks.map((task, idx) => (
          <ListItem
            key={task.label}
            divider={idx < tasks.length - 1}
            sx={{ py: 0.75, px: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <task.icon sx={{ color: task.color }} />
            </ListItemIcon>
            <ListItemText primary={task.label} primaryTypographyProps={{ variant: 'body1' }} />
            <Typography variant="subtitle1" fontWeight={700}>
              {task.count}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default PendingTasksCard
