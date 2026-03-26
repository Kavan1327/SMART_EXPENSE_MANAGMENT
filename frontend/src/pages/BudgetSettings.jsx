import { useMemo, useState } from 'react'
import { Alert, Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material'
import { postBudget } from '../services/expenseService'

const CATEGORY_ROWS = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Travel' },
  { id: 3, name: 'Shopping' },
  { id: 4, name: 'Bills' },
]

const TOTAL_BUDGET_CATEGORY_ID = 0

function resolveUserId() {
  const storedUserId = localStorage.getItem('userId')
  const parsedUserId = Number.parseInt(storedUserId || '', 10)

  if (Number.isInteger(parsedUserId) && parsedUserId > 0) {
    return parsedUserId
  }

  return null
}

function toAmount(value) {
  const parsed = Number.parseFloat(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }
  return parsed
}

function BudgetSettings() {
  const [totalBudget, setTotalBudget] = useState('')
  const [categoryBudgets, setCategoryBudgets] = useState({
    Food: '',
    Travel: '',
    Shopping: '',
    Bills: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const currentMonthYear = useMemo(() => {
    const now = new Date()
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    }
  }, [])

  const handleCategoryChange = (categoryName, value) => {
    setCategoryBudgets((previous) => ({
      ...previous,
      [categoryName]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      const userId = resolveUserId()

      if (!userId) {
        throw new Error('User session missing. Please login again.')
      }

      const totalPayload = {
        userId,
        categoryId: TOTAL_BUDGET_CATEGORY_ID,
        monthlyLimit: toAmount(totalBudget),
        month: currentMonthYear.month,
        year: currentMonthYear.year,
      }

      const categoryPayloads = CATEGORY_ROWS.map((row) => ({
        userId,
        categoryId: row.id,
        monthlyLimit: toAmount(categoryBudgets[row.name]),
        month: currentMonthYear.month,
        year: currentMonthYear.year,
      }))

      await postBudget(totalPayload)
      await Promise.all(categoryPayloads.map((payload) => postBudget(payload)))

      setSuccessMessage('Budget settings saved successfully.')
    } catch (saveError) {
      const apiMessage = saveError?.response?.data?.message || 'Unable to save budget settings right now.'
      setError(apiMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#0f0f0f', minHeight: '100%' }}>
      <Card
        sx={{
          bgcolor: '#1a1a1a',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.06)',
          p: { xs: 2, md: 3 },
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={700}>
            Budget Settings
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Stack spacing={1.2}>
            <Typography variant="h6" fontWeight={700}>
              Total Monthly Budget
            </Typography>
            <TextField
              label="Total Monthly Budget"
              type="number"
              value={totalBudget}
              onChange={(event) => setTotalBudget(event.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  bgcolor: '#121212',
                },
              }}
            />
          </Stack>

          <Stack spacing={1.2}>
            <Typography variant="h6" fontWeight={700}>
              Category Budgets
            </Typography>

            <Grid container spacing={1.5}>
              {CATEGORY_ROWS.map((row) => (
                <Grid key={row.id} item xs={12}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                  >
                    <Typography sx={{ minWidth: 120, color: '#d4d4d4', fontWeight: 600 }}>
                      {row.name}
                    </Typography>
                    <TextField
                      type="number"
                      label={`${row.name} Budget`}
                      value={categoryBudgets[row.name]}
                      onChange={(event) => handleCategoryChange(row.name, event.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2.5,
                          bgcolor: '#121212',
                        },
                      }}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaving}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                px: 3,
                bgcolor: '#00d1b2',
                color: '#0f0f0f',
                '&:hover': { bgcolor: '#00b89d' },
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}

export default BudgetSettings