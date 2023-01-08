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
  ButtonGroup,
  Container,
  Stack,
  Center,
  useOutsideClick,
  Icon,
} from '@chakra-ui/react'
import { AiOutlineMail, AiOutlineMenu } from 'react-icons/ai'
import { ImCoinDollar } from 'react-icons/im'
import { useDisclosure } from '@chakra-ui/react'
import { useLogout } from '../hooks/useAuth'
import { routes } from '../lib/routes'
import { store, useSnapshot, snapshot } from '@/stores/store'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import { useRef, useEffect } from 'react'

export default function Layout() {
  const bg = useColorModeValue('white', ' gray.800')
  const mobileNav = useDisclosure()
  const ref = useRef()
  // useOutsideClick({
  //   ref: ref,
  //   handler: () => mobileNav.onClose(),
  // })

  let activeStyle = {
    textDecoration: 'underline',
    textDecorationColor: '#017991',
    textDecorationThickness: '2px',
    color: '#017991',
  }

  let color = {
    color: '#06adce',
  }

  const { logout, isLoading: logoutLoading } = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  const user = useSnapshot(store)

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
              <VisuallyHidden>Payroll</VisuallyHidden>
            </chakra.a>
            <Button
              leftIcon={
                <Icon color="cyan.600" as={ImCoinDollar} w={6} h={6} mt="1px" />
              }
              variant="ghost"
              onClick={() => navigate(routes.HOME)}
            >
              <NavLink
                to={routes.HOME}
                // style={({ isActive }) => (isActive ? activeStyle : color)}
              >
                <Text
                  bgGradient="linear(to-b, #42047e, #07f49e)"
                  bgClip="text"
                  fontSize="xl"
                  fontWeight="extrabold"
                  // ml={2}
                  textTransform="uppercase"
                >
                  tracker
                </Text>
              </NavLink>
            </Button>
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
              {user.isSignedIn ? (
                <>
                  {' '}
                  <Button variant="ghost" onClick={() => navigate(routes.HOME)}>
                    <NavLink
                      to={routes.HOME}
                      style={({ isActive }) => (isActive ? activeStyle : color)}
                    >
                      Home
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.DAILY)}
                  >
                    <NavLink
                      to={routes.DAILY}
                      style={({ isActive }) => (isActive ? activeStyle : color)}
                    >
                      DailyForm
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(routes.DASHBOARD)}
                  >
                    <NavLink
                      to={routes.DASHBOARD}
                      style={({ isActive }) => (isActive ? activeStyle : color)}
                    >
                      Dashboard
                    </NavLink>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    style={color}
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
                      style={({ isActive }) => (isActive ? activeStyle : color)}
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
                      style={({ isActive }) => (isActive ? activeStyle : color)}
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
                zIndex={2}
                opacity={0.8}
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                {user.isSignedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(routes.HOME)}
                    >
                      <NavLink
                        to={routes.HOME}
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
                        to={routes.DAILY}
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        DailyForm
                      </NavLink>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(routes.DASHBOARD)}
                    >
                      <NavLink
                        to={routes.DASHBOARD}
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Dashboard
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
                        to={routes.REGISTER}
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
                        to={routes.LOGIN}
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        Login
                      </NavLink>
                    </Button>
                  </>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Box as="main" role="main">
        <Outlet />
        <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
          <Center>
            <Stack spacing={{ base: '4', md: '5' }}>
              <Stack justify="space-between" direction="row" align="center">
                {/* <Logo /> */}
                <ButtonGroup variant="ghost">
                  <IconButton
                    as="a"
                    href="#"
                    aria-label="LinkedIn"
                    icon={<AiOutlineMail fontSize="1.25rem" />}
                  />
                  <IconButton
                    as="a"
                    href="#"
                    aria-label="GitHub"
                    icon={<FaGithub fontSize="1.25rem" />}
                  />
                  <IconButton
                    as="a"
                    href="#"
                    aria-label="Twitter"
                    icon={<FaTwitter fontSize="1.25rem" />}
                  />
                </ButtonGroup>
              </Stack>
              <Text fontSize="sm" color="subtle">
                &copy; {new Date().getFullYear()} KnZ KustomZ LLC. All rights
                reserved.
              </Text>
            </Stack>
          </Center>
        </Container>
      </Box>
    </>
  )
}

// export async function loader({ request, params }) {
//   // async function getInitialAuthState() {
//   let user = store.userId
//   if (user) {
//     return { user }
//   }
// }
