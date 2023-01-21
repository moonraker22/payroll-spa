import {
  Box,
  Center,
  Highlight,
  Link,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'

export default function SlideEx({ isGoogle }: { isGoogle: boolean }) {
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    if (isGoogle) {
      onToggle()
    }
  }, [isGoogle])

  return (
    <>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="cyan.500"
          rounded="md"
          shadow="md"
        >
          <Center>
            <Text fontSize="xl" color="gray.200">
              You are currently logged in with Google. To change your password
              go{' '}
              <Link color="cyan.300" href={'https://google.com/account'}>
                <Highlight
                  query="here"
                  styles={{ px: '2', py: '1', rounded: 'full', bg: 'blue.100' }}
                >
                  here
                </Highlight>
              </Link>
            </Text>
          </Center>
        </Box>
      </Slide>
    </>
  )
}
