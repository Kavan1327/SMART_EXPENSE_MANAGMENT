import { Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material'
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Link } from 'react-router-dom'

const actions = [
  { label: 'New expense', icon: <AddCircleRoundedIcon />, color: '#c084fc' },
  { label: 'Add receipt', icon: <ReceiptLongRoundedIcon />, color: '#22c55e' },
  { label: 'Create report', icon: <AddCardRoundedIcon />, color: '#06b6d4' },
  { label: 'Create trip', icon: <RocketLaunchRoundedIcon />, color: '#f97316' },
]

function QuickAccessActions() {
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
      <CardContent sx={{ py: 2.25 }}>
        <Typography variant="h6" gutterBottom>
          Quick Access
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid key={action.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                {...(action.label === 'New expense' ? { component: Link, to: '/expenses/new' } : {})}
                fullWidth
                startIcon={action.icon}
                sx={{
                  justifyContent: 'flex-start',
                  color: action.color,
                  borderColor: `${action.color}66`,
                  borderRadius: 1,
                  minHeight: 55,
                  px: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: action.color,
                    bgcolor: `${action.color}14`,
                  },
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default QuickAccessActions
