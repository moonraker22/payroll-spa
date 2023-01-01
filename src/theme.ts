// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const extendedTheme = {
  brand: {
    primary: 'red',
    800: '#153e75',
    700: '#2a69ac',
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
}

// 3. extend the theme
const theme = extendTheme({ ...config, ...extendedTheme })

export default theme
