import router from '@/lib/routes'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import '@fontsource/ubuntu/400.css'
import { AnimatePresence } from 'framer-motion'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthUserProvider } from './stores/auth'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </AuthUserProvider>
    </ChakraProvider>
  )
}

export default App
