import { WarningTwoIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

export default function DeleteAlert({ isOpen, onClose, handleDelete }) {
  const cancelRef = useRef()

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Day?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this pay? You can't undo this action
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              px={5}
              colorScheme="cyan"
              type="submit"
              variant="outline"
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              _hover={{
                bg: 'red.600',
                color: 'white',
                scale: 1.1,
              }}
              ml={3}
              onClick={handleDelete}
              rightIcon={<WarningTwoIcon />}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}