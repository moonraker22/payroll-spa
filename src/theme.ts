// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { background } from './lib/constants'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// const extendedTheme = {
//   brand: {
//     primary: ' #07f49e',
//     secondary: '#42047e',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
//   fonts: {
//     heading: `'Montserrat', sans-serif`,
//     body: `'Roboto', sans-serif`,
//   },
// }

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}

export const theme = extendTheme({
  global: (props: any) => ({
    '.pagination': {
      display: 'flex',
    },
  }),

  config,
  brand: {
    primary: ' #07f49e',
    secondary: '#42047e',
    800: '#153e75',
    700: '#2a69ac',
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Roboto', sans-serif`,
  },

  components: {
    Modal: {
      variants: ({ colorMode }) => ({
        floating: {
          dialog: {
            bg: colorMode === 'dark' ? 'gray.900' : 'gray.50',
            boxShadow: 'xl',
          },
        },
      }),
    },
    Form: {
      variants: {
        floating: ({ colorMode }) => ({
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: colorMode === 'dark' ? 'gray.800' : 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
              color: colorMode === 'dark' ? 'cyan.300' : 'cyan.800',
            },
          },
        }),
      },
    },
  },
})

// const extendedTheme = {
//   global: (props: any) => ({
//     body: {
//       bg: mode('gray.50', 'gray.800')(props),
//       color: mode('gray.800', 'whiteAlpha.900')(props),

//     },

//   }),
//   fonts: {
//     heading: `'Montserrat', sans-serif`,
//     body: `'Roboto', sans-serif`,
//   },
//   colors: {
//     brand: {
//       primary: ' #07f49e',
//       secondary: '#42047e',
//       800: '#153e75',
//       700: '#2a69ac',
//     },
//   },
//   components: {
//     Form: {
//       variants: {
//         floating: {
//           container: {
//             _focusWithin: {
//               label: {
//                 ...activeLabelStyles,
//               },
//             },
//             'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
//               {
//                 ...activeLabelStyles,
//               },
//             label: {
//               top: 0,
//               left: 0,
//               zIndex: 2,
//               position: 'absolute',
//               backgroundColor: mode('gray.800', 'gray.800')(props),
//               pointerEvents: 'none',
//               mx: 3,
//               px: 1,
//               my: 2,
//               transformOrigin: 'left top',
//             },
//           },
//         },
//       },
//     },
//   },
// }

// 3. extend the theme
// const theme = extendTheme({ extendedTheme })

export default theme
