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
import { type FocusableElement } from '@chakra-ui/utils'
import { useRef, type RefObject } from 'react'

export default function DeleteAlert({
  isOpen,
  onClose,
  handleDelete,
}: {
  isOpen: boolean
  onClose: () => void
  handleDelete: () => void
}): JSX.Element {
  const cancelRef = useRef<FocusableElement | null>(
    null
  ) as RefObject<FocusableElement>

  const buttonRef = useRef<HTMLButtonElement | null>(null)
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
            Are you sure you want to delete this pay? You can&apos;t undo this
            action
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={buttonRef}
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
                bg: 'red.400',
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
