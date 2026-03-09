import { useState } from 'react'
import { Alert, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

function Register() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formValues.name) {
      errors.name = 'Name is required'
    } else if (formValues.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    if (!formValues.email) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!formValues.password) {
      errors.password = 'Password is required'
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await registerUser({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      })

      if (!response?.success) {
        setSubmitError(response?.message || 'Registration failed. Please try again.')
        return
      }

      setSubmitSuccess('Registration successful. Redirecting to login...')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 800)
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'Unable to register right now.'
      setSubmitError(apiMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: '#0f0f0f',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 460,
          bgcolor: '#1a1a1a',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          p: 3,
        }}
      >
        <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
          <Typography variant="h4" fontWeight={700}>
            Sign up
          </Typography>

          <TextField
            name="name"
            label="Name"
            fullWidth
            size="small"
            value={formValues.name}
            onChange={handleChange}
            error={Boolean(fieldErrors.name)}
            helperText={fieldErrors.name}
          />

          <TextField
            name="email"
            label="Email"
            fullWidth
            size="small"
            value={formValues.email}
            onChange={handleChange}
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            size="small"
            value={formValues.password}
            onChange={handleChange}
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
          />

          {submitError && <Alert severity="error">{submitError}</Alert>}
          {submitSuccess && <Alert severity="success">{submitSuccess}</Alert>}

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              mt: 0.5,
              textTransform: 'none',
              fontWeight: 700,
              bgcolor: '#00d1b2',
              color: '#0f0f0f',
              '&:hover': { bgcolor: '#00b89d' },
            }}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{' '}
            <Button
              component={Link}
              to="/login"
              size="small"
              sx={{
                textTransform: 'none',
                color: '#00d1b2',
                fontWeight: 600,
                minWidth: 'auto',
                p: 0,
                verticalAlign: 'baseline',
              }}
            >
              Sign in
            </Button>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default Register
