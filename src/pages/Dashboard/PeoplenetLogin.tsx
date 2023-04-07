import {
  Button,
  Center,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineLogin } from 'react-icons/ai'

export default function PeoplenetLogin() {
  const color = useColorModeValue('gray.800', 'cyan.600')

  return (
    <Center p="10px">
      <VStack
        border="1px"
        borderColor={'cyan.600'}
        p="15px"
        rounded={'lg'}
        maxW="300px"
        minW="300px"
        my="auto"
      >
        <Heading
          as="h3"
          size="lg"
          textAlign={'center'}
          bgGradient="linear(to-b, #42047e, #07f49e)"
          bgClip="text"
        >
          Peoplenet
        </Heading>
        <Divider variant={'dashed'} w="80%" />

        <Text fontSize="sm" color="gray.500">
          Go to the Peoplenet login page
        </Text>
        <Text fontSize="sm" color="gray.400">
          Organization ID is 2081
        </Text>
        <Button
          colorScheme="cyan"
          variant="outline"
          as="a"
          target={'_blank'}
          rel="noreferrer noopener"
          href="https://compliance.fleethealth.io/efleetsuite/Login.aspx"
          _hover={{
            bg: 'cyan.600',
            color: 'white',
            scale: 1.1,
          }}
          rightIcon={<AiOutlineLogin />}
          boxShadow="lg"
        >
          Peoplenet Login
        </Button>
      </VStack>
    </Center>
  )
}
