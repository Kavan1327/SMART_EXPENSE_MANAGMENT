import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'

function Topbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        height: 70,
        justifyContent: 'center',
        bgcolor: '#0f0f0f',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ minHeight: 'auto', px: { xs: 2, md: 3 }, gap: 2, display: 'flex' }}>
        <Typography variant="h6" fontWeight={700} sx={{ minWidth: 180, flexShrink: 0 }}>
          Main Dashboard
        </Typography>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            placeholder="Search transactions, teams, or reports"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{
              maxWidth: 560,
              width: '100%',
              '& .MuiOutlinedInput-root': {
                bgcolor: alpha('#ffffff', 0.04),
                borderRadius: 999,
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.16)' },
                '&.Mui-focused fieldset': { borderColor: '#22c55e' },
              },
              '& .MuiInputBase-input': {
                py: 1.1,
              },
            }}
          />
        </Box>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
          <IconButton color="inherit" sx={{ bgcolor: alpha('#ffffff', 0.04) }}>
            <NotificationsRoundedIcon />
          </IconButton>
          <Avatar
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=60"
            alt="User avatar"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="body1" fontWeight={600}>
            Hi, User!
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
