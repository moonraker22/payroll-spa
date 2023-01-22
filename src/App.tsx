import router from '@/layout/routes'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import '@fontsource/ubuntu/400.css'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import theme from './layout/theme'
import { AuthUserProvider } from './stores/auth'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <RouterProvider router={router} />
      </AuthUserProvider>
    </ChakraProvider>
  )
}

export default App
