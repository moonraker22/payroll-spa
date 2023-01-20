import router from '@/lib/routes'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/roboto/400.css'
import '@fontsource/ubuntu/400.css'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthUserProvider } from './stores/auth'
import theme from './theme'

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
