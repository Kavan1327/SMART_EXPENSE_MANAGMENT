import { Box, Stack, Typography } from '@mui/material'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import NewExpense from './pages/NewExpense'
import Login from './pages/Login'
import Register from './pages/Register'

function Placeholder({ title }) {
  return (
    <Stack spacing={1} sx={{ p: { xs: 3, md: 4 } }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        Coming soon.
      </Typography>
    </Stack>
  )
}

function App() {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login'
  const isRegisterRoute = location.pathname === '/register'
  const isAuthRoute = isLoginRoute || isRegisterRoute
  const hasToken = Boolean(localStorage.getItem('jwtToken'))

  if (!hasToken && !isAuthRoute) {
    return <Navigate to="/login" replace />
  }

  if (hasToken && isAuthRoute) {
    return <Navigate to="/" replace />
  }

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />

      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/new" element={<NewExpense />} />
            <Route path="/expenses/:id/edit" element={<NewExpense />} />
            <Route path="/trips" element={<Placeholder title="Trips" />} />
            <Route path="/approvals" element={<Placeholder title="Approvals" />} />
            <Route path="/settings" element={<Placeholder title="Settings" />} />
            <Route path="/support" element={<Placeholder title="Support" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default App
