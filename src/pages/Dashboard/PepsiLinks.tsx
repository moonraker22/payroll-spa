import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import {
  AiOutlineAndroid,
  AiOutlineApple,
  AiOutlineLogin,
} from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
export default function PepsiLinks() {
  const color = useColorModeValue('gray.800', 'cyan.600')
  return (
    <Center p="10px">
      <VStack
        border="1px"
        borderColor={'cyan.600'}
        p="15px"
        rounded={'lg'}
        spacing="20px"
        maxW="300px"
        minW="300px"
      >
        <Heading
          as="h3"
          size="lg"
          textAlign={'center'}
          bgGradient="linear(to-b, #42047e, #07f49e)"
          bgClip="text"
        >
          Pepsi Links
        </Heading>
        <Divider variant={'dashed'} w="80%" />

        <Button
          colorScheme="cyan"
          variant="outline"
          as={RouterLink}
          to={'https://www.mypepsico.com/'}
          _hover={{
            bg: 'cyan.600',
            color: 'white',
            scale: 1.1,
          }}
          rightIcon={<AiOutlineLogin />}
          boxShadow="lg"
          mt="10px"
        >
          MyPepsico Login
        </Button>
        <Box>
          <Text fontSize="md" color={color} my="10px" textAlign={'center'}>
            MyPepsico App
          </Text>
          <Text fontSize="sm" color={'gray'} my="10px" textAlign={'center'}>
            Official PepsiCo app
          </Text>

          <SimpleGrid columns={2} placeItems="center">
            <IconButton
              as="a"
              aria-label="MyPesico"
              variant={'ghost'}
              href="https://apps.apple.com/us/app/mypepsico/id1532412267"
              icon={<AiOutlineApple fontSize="1.5rem" />}
            />
            <IconButton
              as="a"
              aria-label="MyPesico"
              variant={'ghost'}
              href="https://play.google.com/store/apps/details?id=com.pepsico.mypepsico&gl=US"
              icon={<AiOutlineAndroid fontSize="1.5rem" />}
            />
          </SimpleGrid>
        </Box>
        <Divider variant={'dashed'} w="50%" />
        <Box w="100%">
          <Text fontSize="md" color={color} my="10px" textAlign={'center'}>
            Castlight App
          </Text>
          <Text fontSize="sm" color={'gray'} my="5px" textAlign={'center'}>
            Get gift cards for healthy choices
          </Text>
        </Box>
        <Box>
          <SimpleGrid columns={2} spacing={5} placeItems="center">
            <IconButton
              as="a"
              aria-label="MyPesico"
              variant={'ghost'}
              href="https://apps.apple.com/us/app/castlight-mobile/id503468685"
              icon={<AiOutlineApple fontSize="1.5rem" />}
            />
            <IconButton
              as="a"
              aria-label="MyPesico"
              variant={'ghost'}
              href="https://play.google.com/store/apps/details?id=com.castlight.clh.view&gl=US"
              icon={<AiOutlineAndroid fontSize="1.5rem" />}
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Center>
  )
}
