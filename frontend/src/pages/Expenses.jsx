import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SortRoundedIcon from '@mui/icons-material/SortRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { Link, useNavigate } from 'react-router-dom'
import { deleteExpense, getUserExpenses } from '../services/expenseService'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const CURRENCY_SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£',
}

function formatDate(dateValue) {
  if (!dateValue) {
    return '--/--/----'
  }

  const parsedDate = new Date(dateValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return '--/--/----'
  }

  const day = String(parsedDate.getDate()).padStart(2, '0')
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const year = parsedDate.getFullYear()
  return `${day}/${month}/${year}`
}

function buildReportLabel(dateValue) {
  if (!dateValue) {
    return 'N/A'
  }

  const parsedDate = new Date(dateValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A'
  }

  return `${MONTH_NAMES[parsedDate.getMonth()]}_${parsedDate.getFullYear()}`
}

function formatAmount(amount, currencyCode) {
  const numericAmount = Number(amount)
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0
  const symbol = CURRENCY_SYMBOLS[currencyCode] || ''
  return `${symbol}${safeAmount.toFixed(2)}`
}

function mapStatus(status) {
  const normalized = (status || '').trim().toUpperCase()

  if (normalized === 'SUBMITTED') {
    return 'Submitted'
  }

  if (normalized === 'APPROVED') {
    return 'Approved'
  }

  return 'Not Submitted'
}

function resolveUserId() {
  const storedUserId = localStorage.getItem('userId')
  const parsedUserId = Number.parseInt(storedUserId || '', 10)

  if (Number.isInteger(parsedUserId) && parsedUserId > 0) {
    return parsedUserId
  }

  return null
}

function Expenses() {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchExpenses = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const userId = resolveUserId()
        if (!userId) {
          throw new Error('User session is missing. Please login again.')
        }
        const response = await getUserExpenses(userId)

        if (isMounted) {
          setExpenses(Array.isArray(response) ? response : [])
        }
      } catch (error) {
        if (isMounted) {
          const apiMessage = error?.response?.data?.message || 'Unable to load expenses right now.'
          setLoadError(apiMessage)
          setExpenses([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchExpenses()

    return () => {
      isMounted = false
    }
  }, [])

  const mappedExpenses = useMemo(
    () =>
      expenses.map((expense) => ({
        id: expense.id,
        raw: expense,
        date: formatDate(expense.expenseDate),
        title: expense.subject || expense.description || 'Untitled expense',
        merchant: expense.merchant || 'Unknown Merchant',
        amount: formatAmount(expense.amount, expense.currency),
        report: buildReportLabel(expense.expenseDate),
        status: mapStatus(expense.status),
      })),
    [expenses],
  )

  const handleEditExpense = (expense) => {
    navigate(`/expenses/${expense.id}/edit`, { state: { expense } })
  }

  const handleDeleteExpense = async (expenseId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this expense?')
    if (!shouldDelete) {
      return
    }

    try {
      await deleteExpense(expenseId)
      setExpenses((previous) => previous.filter((expense) => expense.id !== expenseId))
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'Unable to delete expense right now.'
      setLoadError(apiMessage)
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#0f0f0f' }}>
      <Card
        sx={{
          backgroundColor: '#1a1a1a',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          p: { xs: 1.5, md: 2.5 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1.5, gap: 2, flexWrap: 'wrap' }}
        >
          <Typography variant="h4" fontWeight={700}>
            Expenses
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              component={Link}
              to="/expenses/new"
              startIcon={<AddRoundedIcon />}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 700,
                bgcolor: '#00d1b2',
                color: '#0f0f0f',
                '&:hover': { bgcolor: '#00b89d' },
              }}
            >
              New expense
            </Button>
            <IconButton sx={{ bgcolor: '#121212', border: '1px solid rgba(255,255,255,0.08)' }}>
              <FilterListRoundedIcon sx={{ color: '#00d1b2' }} />
            </IconButton>
            <IconButton sx={{ bgcolor: '#121212', border: '1px solid rgba(255,255,255,0.08)' }}>
              <SortRoundedIcon sx={{ color: '#00d1b2' }} />
            </IconButton>
            <IconButton sx={{ bgcolor: '#121212', border: '1px solid rgba(255,255,255,0.08)' }}>
              <MoreHorizRoundedIcon sx={{ color: '#9ca3af' }} />
            </IconButton>
          </Stack>
        </Stack>

        {loadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loadError}
          </Alert>
        )}

        <Table
          size="small"
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            '& .MuiTableCell-root': {
              borderBottom: 'none',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700, width: 54 }}>
                <Checkbox size="small" sx={{ color: '#8b8b8b' }} />
              </TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700 }}>Details</TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700 }}>Merchant</TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700 }}>Report</TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: '#9ca3af', fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mappedExpenses.map((row) => {
              const submitted = row.status === 'Submitted'
              const approved = row.status === 'Approved'

              return (
                <TableRow key={row.id || `${row.date}-${row.title}`}>
                  <TableCell
                    sx={{
                      bgcolor: '#191919',
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    <Checkbox size="small" sx={{ color: '#8b8b8b' }} />
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#191919' }}>
                    <Stack spacing={0.25}>
                      <Typography variant="caption" color="text.secondary">
                        {row.date}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {row.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#191919', color: '#e5e7eb', fontWeight: 600 }}>
                    {row.merchant}
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#191919', color: '#f3f4f6', fontWeight: 700 }}>
                    {row.amount}
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#191919', color: '#d1d5db', fontWeight: 600 }}>
                    {row.report}
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: '#191919',
                    }}
                  >
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        borderRadius: 999,
                        fontWeight: 700,
                        color: '#fff',
                        bgcolor: approved ? '#166534' : submitted ? '#6d28d9' : '#be185d',
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: '#191919',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      textAlign: 'center',
                    }}
                  >
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <IconButton size="small" onClick={() => handleEditExpense(row.raw)}>
                        <EditRoundedIcon sx={{ fontSize: 18, color: '#00d1b2' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteExpense(row.id)}>
                        <DeleteRoundedIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}

            {!isLoading && mappedExpenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} sx={{ bgcolor: '#191919', borderRadius: 2, py: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    No expenses found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} sx={{ bgcolor: '#191919', borderRadius: 2, py: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Loading expenses...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}

export default Expenses
