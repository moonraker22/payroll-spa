import { Box, Flex, AbsoluteCenter, Avatar, Center } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <Box h="100vh" bg="tomato">
      <Center my="10">
        <Avatar
          size="2xl"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </Center>
    </Box>
  )
}
