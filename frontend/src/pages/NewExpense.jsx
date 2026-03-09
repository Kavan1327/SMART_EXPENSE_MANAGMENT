import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addExpense, updateExpense } from '../services/expenseService'

const CATEGORY_ID_MAP = {
  Travel: 2,
  'Office Supplies': 3,
  Meals: 4,
  Accommodation: 5,
}

const CATEGORY_LABEL_BY_ID = Object.fromEntries(
  Object.entries(CATEGORY_ID_MAP).map(([label, id]) => [id, label]),
)

const INITIAL_FORM_VALUES = {
  subject: '',
  merchant: '',
  expenseDate: '',
  amount: '',
  description: '',
  employee: '',
}

function NewExpense() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEditMode = useMemo(() => Number.isInteger(Number.parseInt(id || '', 10)), [id])
  const editingExpense = location.state?.expense || null
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
  const [currency, setCurrency] = useState('EUR')
  const [category, setCategory] = useState('Travel')
  const [reimbursable, setReimbursable] = useState(true)
  const [addToReport, setAddToReport] = useState('yes')
  const [isSaving, setIsSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    if (!editingExpense) {
      setSubmitError('Expense details are missing. Please try editing from expenses list again.')
      return
    }

    setFormValues({
      subject: editingExpense.subject || '',
      merchant: editingExpense.merchant || '',
      expenseDate: editingExpense.expenseDate || '',
      amount: editingExpense.amount != null ? String(editingExpense.amount) : '',
      description: editingExpense.description || '',
      employee: String(editingExpense.userId || ''),
    })
    setCurrency(editingExpense.currency || 'EUR')
    setCategory(CATEGORY_LABEL_BY_ID[editingExpense.categoryId] || 'Travel')
    setReimbursable(Boolean(editingExpense.reimbursable))
    setAddToReport(Boolean(editingExpense.addToReport) ? 'yes' : 'no')
  }, [editingExpense, isEditMode])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    const storedUserId = Number.parseInt(localStorage.getItem('userId') || '', 10)
    if (!Number.isInteger(storedUserId) || storedUserId <= 0) {
      setSubmitError('User session is missing. Please login again.')
      return
    }

    const parsedAmount = Number.parseFloat(formValues.amount)
    const today = new Date().toISOString().split('T')[0]

    const payload = {
      userId: storedUserId,
      amount: Number.isNaN(parsedAmount) ? 0 : parsedAmount,
      categoryId: CATEGORY_ID_MAP[category] || 2,
      description: formValues.description.trim() || 'No description provided',
      subject: formValues.subject.trim() || 'General Expense',
      merchant: formValues.merchant.trim() || 'Unknown Merchant',
      currency,
      reimbursable,
      addToReport: addToReport === 'yes',
      receiptUrl: null,
      status: editingExpense?.status || 'PENDING',
      expenseDate: formValues.expenseDate || today,
    }

    setIsSaving(true)
    try {
      const response = isEditMode
        ? await updateExpense(Number.parseInt(id, 10), payload)
        : await addExpense(payload)
      setSubmitSuccess(`Expense saved successfully (id: ${response.id}).`)
      navigate('/expenses')
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'Unable to save expense right now.'
      setSubmitError(apiMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#0f0f0f' }}>
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#1a1a1a',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          p: { xs: 2, md: 2.5 },
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          {isEditMode ? 'Edit expense' : 'New expense'}
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {submitSuccess}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={1.5}>
              <TextField
                name="subject"
                label="Subject *"
                fullWidth
                size="small"
                value={formValues.subject}
                onChange={handleChange}
              />
              <TextField
                name="merchant"
                label="Merchant *"
                fullWidth
                size="small"
                value={formValues.merchant}
                onChange={handleChange}
              />
              <TextField
                name="expenseDate"
                label="Date *"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formValues.expenseDate}
                onChange={handleChange}
              />

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <TextField
                    name="amount"
                    label="Total *"
                    fullWidth
                    size="small"
                    type="number"
                    inputProps={{ min: 0, step: '0.01' }}
                    value={formValues.amount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControl fullWidth size="small">
                    <Select
                      value={currency}
                      onChange={(event) => setCurrency(event.target.value)}
                      size="small"
                      displayEmpty
                    >
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={reimbursable}
                    onChange={(event) => setReimbursable(event.target.checked)}
                  />
                }
                label="Reimbursable"
              />

              <FormControl fullWidth size="small">
                <Select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                  <MenuItem value="Meals">Meals</MenuItem>
                  <MenuItem value="Accommodation">Accommodation</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="description"
                label="Description"
                multiline
                minRows={3}
                fullWidth
                size="small"
                value={formValues.description}
                onChange={handleChange}
              />
              <TextField
                name="employee"
                label="Employee *"
                fullWidth
                size="small"
                value={localStorage.getItem('userId') || ''}
                helperText="User ID from current login session"
                InputProps={{ readOnly: true }}
              />

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Add to report
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={addToReport === 'yes'}
                      onChange={() => setAddToReport('yes')}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={addToReport === 'no'}
                      onChange={() => setAddToReport('no')}
                    />
                  }
                  label="No"
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                minHeight: { xs: 220, md: 470 },
                borderRadius: 2,
                backgroundColor: '#1f1f1f',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <AddRoundedIcon sx={{ fontSize: 46, color: '#d1d5db' }} />
                <Typography variant="body2" color="text.secondary">
                  Upload an invoice
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSaving}
            sx={{
              minWidth: 120,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 700,
              bgcolor: '#00d1b2',
              color: '#0f0f0f',
              '&:hover': { bgcolor: '#00b89d' },
            }}
          >
            {isSaving ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default NewExpense
