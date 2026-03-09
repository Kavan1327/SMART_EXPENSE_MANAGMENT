import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const expenses = [
  { subject: 'Office Supplies', employee: 'John Smith', team: 'Marketing', amount: '€150.00', color: '#22c55e' },
  { subject: 'Business Lunch', employee: 'Sarah Jade', team: 'Sales', amount: '€75.50', color: '#f97316' },
  { subject: 'Travel Expenses', employee: 'Mike Brown', team: 'Operations', amount: '€450.25', color: '#8b5cf6' },
  { subject: 'Client Dinner', employee: 'Jennifer Lee', team: 'Marketing', amount: '€120.00', color: '#22c55e' },
  { subject: 'Hotel', employee: 'David Wilson', team: 'Finance', amount: '€275.75', color: '#06b6d4' },
]

function RecentExpensesTable() {
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
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" gutterBottom>
          Recent Expenses
        </Typography>
        <Table size="small" sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary' }}>Subject</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Employee</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Team</TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow key={row.subject} hover>
                <TableCell sx={{ color: '#f8fafc' }}>{row.subject}</TableCell>
                <TableCell sx={{ color: '#e2e8f0' }}>{row.employee}</TableCell>
                <TableCell>
                  <Chip
                    label={row.team}
                    size="small"
                    sx={{
                      bgcolor: `${row.color}26`,
                      color: row.color,
                      borderRadius: 1.5,
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ color: '#f8fafc', fontWeight: 700 }}>
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentExpensesTable
