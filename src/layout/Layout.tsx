import { ColorModeSwitcher } from '@/components/ColorModeSwitcher'
import SpinnerComp from '@/components/SpinnerComp'
import { useLogout } from '@/hooks/useAuth'
import { routes } from '@/layout/routes'
import theme from '@/layout/theme'
import { useStore } from '@/stores/store'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  chakra,
  CloseButton,
  ColorModeScript,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Show,
  Text,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { ImCoinDollar } from 'react-icons/im'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  const bg = useColorModeValue('white', ' gray.800')
  const mobileNav = useDisclosure()
  // const ref = useRef()
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

  const snap = useStore()
  const location = useLocation()

  if (!snap) {
    return <SpinnerComp />
  }
  return (
    <>
      <Suspense fallback={<SpinnerComp />}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
                  <Icon
                    color="cyan.600"
                    as={ImCoinDollar}
                    w={6}
                    h={6}
                    mt="1px"
                  />
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
            <VisuallyHidden>
              <Image
                src={snap.avatar}
                referrerPolicy="no-referrer"
                alt="avatar"
              />
            </VisuallyHidden>
            <Show below="md">
              <ColorModeSwitcher ml="auto" />
              {snap.isSignedIn && (
                <Avatar
                  as={NavLink}
                  to={routes.PROFILE}
                  size="sm"
                  name={snap.userEmail}
                  src={snap.avatar}
                >
                  <AvatarBadge boxSize="1em" bg="cyan.600" />
                </Avatar>
              )}
            </Show>
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
                {snap && snap.isSignedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(routes.DAILY)}
                    >
                      <NavLink
                        to={routes.DAILY}
                        style={({ isActive }) =>
                          isActive ? activeStyle : color
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
                          isActive ? activeStyle : color
                        }
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
                        to={routes.REGISTER}
                        style={({ isActive }) =>
                          isActive ? activeStyle : color
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
                          isActive ? activeStyle : color
                        }
                      >
                        Login
                      </NavLink>
                    </Button>
                  </>
                )}
                <Show above="md">
                  {snap.isSignedIn && (
                    <>
                      <Avatar
                        as={NavLink}
                        to={routes.PROFILE}
                        size="sm"
                        name={snap.userEmail}
                        src={snap.avatar}
                      >
                        <AvatarBadge boxSize="1em" bg="cyan.600" />
                      </Avatar>
                    </>
                  )}
                  <ColorModeSwitcher ml="auto" />
                </Show>
              </HStack>
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
                  color="cyan.600"
                  _dark={{
                    color: 'cyan.600',
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
                  {snap && snap.isSignedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => navigate(routes.DAILY)}
                        color="cyan.500"
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
                        color="cyan.500"
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
                        color="cyan.500"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => navigate(routes.HOME)}
                        color="cyan.500"
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
                        onClick={() => navigate(routes.REGISTER)}
                        color="cyan.500"
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
                        color="cyan.500"
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
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>

          <Footer />
        </Box>
      </Suspense>
    </>
  )
}

// const AnimatedOutlet: React.FC = () => {
//   const o = useOutlet()
//   const [outlet] = useState(o)

//   return <>{outlet}</>
// }

// export async function loader({ request, params }) {
//   // async function getInitialAuthState() {
//   let user = store.userId
//   if (user) {
//     return { user }
//   }
// }
