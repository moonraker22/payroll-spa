import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import {
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  VisuallyHidden,
  VStack,
  Text,
} from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useLogout } from '../hooks/useAuth'
import { routes } from '../lib/routes'
import { useIdToken } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConf'
import { useRef } from 'react'

export default function Layout() {
  const bg = useColorModeValue('white', ' gray.700')
  const mobileNav = useDisclosure()
  const clickOutsideRef = useRef(null)

  let activeStyle = {
    textDecoration: 'underline',
  }
  // const { logout } = useStore()
  const [user, loading, error] = useIdToken(auth)

  const { logout, isLoading: logoutLoading } = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Payroll"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}
              <VisuallyHidden>Payroll</VisuallyHidden>
            </chakra.a>
            <Text
              bgGradient="linear(to-b, green.200, pink.500)"
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold"
              ml={2}
              textTransform="uppercase"
            >
              Payroll
            </Text>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              {!loading && !error && user ? (
                <>
                  {' '}
                  <Button variant="ghost" onClick={() => navigate(routes.HOME)}>
                    <NavLink
                      to="/"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Home
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.DAILY)}
                  >
                    <NavLink
                      to="/daily"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      DailyForm
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.WEEKLY)}
                  >
                    <NavLink
                      to="/weekly"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Weekly
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    disabled={logoutLoading}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.REGISTER)}
                  >
                    <NavLink
                      to="/registration"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Register
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.LOGIN)}
                  >
                    <NavLink
                      to="/login"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Login
                    </NavLink>
                  </Button>
                </>
              )}

              <ColorModeSwitcher />
            </HStack>
            {/* <Button colorScheme="brand.800" size="sm">
              Get Started
            </Button> */}
            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button variant="ghost" onClick={() => navigate(routes.HOME)}>
                  <NavLink
                    to="/"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Home
                  </NavLink>
                </Button>
                <Button variant="ghost" onClick={() => navigate(routes.DAILY)}>
                  <NavLink
                    to="/daily"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    DailyForm
                  </NavLink>
                </Button>
                <Button variant="ghost" onClick={() => navigate(routes.WEEKLY)}>
                  <NavLink
                    to="/weekly"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Weekly
                  </NavLink>
                </Button>
                <Button variant="ghost" onClick={() => navigate(routes.WEEKLY)}>
                  <NavLink
                    to="/weekly"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Weekly
                  </NavLink>
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Box as="main" role="main" ref={clickOutsideRef}>
        <Outlet />
      </Box>
    </>
  )
}
