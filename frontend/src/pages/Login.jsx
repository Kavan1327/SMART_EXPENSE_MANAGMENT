import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const existingToken = localStorage.getItem('jwtToken')
    if (existingToken) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await loginUser(formValues)

      if (!response?.success || !response?.data?.accessToken) {
        setSubmitError(response?.message || 'Login failed. Please try again.')
        return
      }

      localStorage.setItem('jwtToken', response.data.accessToken)
      localStorage.setItem('tokenType', response.data.tokenType || 'Bearer')
      localStorage.setItem('userRole', response.data.role || '')
      localStorage.setItem('userId', String(response.data.userId || ''))

      navigate('/', { replace: true })
    } catch (error) {
        console.log("errot-----", error);
        
      const apiMessage = error?.response?.data?.message || 'Unable to login. Check your credentials.'
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
          maxWidth: 440,
          bgcolor: '#1a1a1a',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          p: 3,
        }}
      >
        <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
          <Typography variant="h4" fontWeight={700}>
            Login
          </Typography>

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
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don't have an account?{' '}
            <Button
              component={Link}
              to="/register"
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
              Sign up
            </Button>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default Login
