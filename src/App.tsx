import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Button from '@/components/Button'

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Your React + MUI App
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Built with Vite, TypeScript, and Material UI
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
