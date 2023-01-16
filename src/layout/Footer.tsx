import {
  Container,
  Center,
  Stack,
  ButtonGroup,
  IconButton,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaGithub, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <>
      <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
        <Center>
          <Stack spacing={{ base: '4', md: '5' }}>
            <Stack justify="space-between" direction="row" align="center">
              {/* <Logo /> */}
              <ButtonGroup variant="ghost">
                <IconButton
                  as="a"
                  href="mailto:knzkustomz@gmail.com"
                  aria-label="LinkedIn"
                  icon={<AiOutlineMail fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="https://github.com/moonraker22"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="https://github.com/moonraker22"
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
    </>
  )
}
