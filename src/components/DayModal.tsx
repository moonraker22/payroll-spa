import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  StackDivider,
  Box,
} from '@chakra-ui/react'

export function DayModal({
  onOpen,
  isOpen,
  onClose,
  weekStartFormat,
  weekEndFormat,
  startDate,
  endDate,
}) {
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Daily Pay</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {' '}
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Box>
                Week {weekStartFormat} to {weekEndFormat}
              </Box>
              <Box>Sunday</Box>

              <Box>Monday</Box>
              <Box>Tuesday</Box>
              <Box>Wednesday</Box>
              <Box>Thursday</Box>
              <Box>Friday</Box>
              <Box>Saturday</Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
