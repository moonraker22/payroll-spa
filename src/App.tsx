import { RouterProvider, useRouteError } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import router from '@/lib/routes'
import theme from './theme'
import { AnimatePresence } from 'framer-motion'
import '@fontsource/roboto/400.css'
import '@fontsource/ubuntu/400.css'
import './App.css'
import { AuthUserProvider } from './stores/auth'

// const colors = {
//   brand: {
//     primary: 'red',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
//   fonts: {
//     heading: `'Montserrat', sans-serif`,
//     body: `'Roboto', sans-serif`,
//   },
// }
//  { font-family: "Montserrat", sans-serif; }
// { font-family: "Roboto", sans-serif; }

// const extendedTheme = extendTheme({ ...colors, ...theme })

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
