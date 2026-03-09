import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import FlightRoundedIcon from '@mui/icons-material/FlightRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'

const SIDEBAR_WIDTH = 240

const activeColor = '#00d1b2'
const sidebarBg = '#111111'
const textColor = '#cfcfcf'

const topNav = [
  { label: 'Home', icon: <HomeRoundedIcon />, to: '/' },
  { label: 'Expenses', icon: <AccountBalanceWalletRoundedIcon />, to: '/expenses' },
  { label: 'Trips', icon: <FlightRoundedIcon />, to: '/trips' },
  { label: 'Approvals', icon: <CheckCircleRoundedIcon />, to: '/approvals' },
]

const bottomNav = [
  { label: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
  { label: 'Support', icon: <SupportAgentRoundedIcon />, to: '/support' },
]

const navItemStyles = {
  my: 0.4,
  mx: 1,
  borderRadius: 2,
  color: textColor,
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: textColor,
  },
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.06)',
  },
  '&.sidebar-active': {
    bgcolor: '#1a1a1a',
    color: activeColor,
    '& .MuiListItemIcon-root': {
      color: activeColor,
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
    },
  },
}

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const isItemActive = (route) => {
    if (route === '/') {
      return location.pathname === '/'
    }
    return location.pathname === route
  }

  const handleSignOut = async () => {
    if (isSigningOut) {
      return
    }

    setIsSigningOut(true)
    try {
      await logoutUser()
    } catch {
    } finally {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('tokenType')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      navigate('/login', { replace: true })
      setIsSigningOut(false)
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      PaperProps={{
        sx: {
          bgcolor: sidebarBg,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          color: textColor,
          position: 'relative',
        },
      }}
    >
      <Stack sx={{ height: '100%', py: 3 }}>
        <Box px={2.5} pb={2.5} display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 12px 28px rgba(34,197,94,0.28)',
            }}
          >
            <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: '#0f0f0f' }} />
          </Box>
          <Typography variant="h6" fontWeight={700} letterSpacing={0.3}>
            Quantifi
          </Typography>
        </Box>

        <List sx={{ px: 0.5 }}>
          {topNav.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.to}
              sx={navItemStyles}
              className={isItemActive(item.to) ? 'sidebar-active' : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Box flexGrow={1} />

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2 }} />

        <List sx={{ px: 0.5, pt: 0.5 }}>
          {bottomNav.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.to}
              sx={navItemStyles}
              className={isItemActive(item.to) ? 'sidebar-active' : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <ListItemButton sx={navItemStyles} onClick={handleSignOut} disabled={isSigningOut}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={isSigningOut ? 'Signing out...' : 'Sign out'} />
          </ListItemButton>
        </List>
      </Stack>
    </Drawer>
  )
}

export default Sidebar
