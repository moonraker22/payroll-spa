import { PasswordPromptSchema, PasswordPromptType } from '@/data/paySchema'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'

type PasswordPromptProps = {
  setPass: (pass: string) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export default function PasswordPrompt({
  setPass,
  isOpen,
  onOpen,
  onClose,
}: PasswordPromptProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordPromptType>({
    resolver: zodResolver(PasswordPromptSchema),
  })

  const onSubmit: SubmitHandler<PasswordPromptType> = (data) => {
    console.log(data)
    setPass(data.currentPassword)
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Current Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="password" isRequired isInvalid={false}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('currentPassword')}
                  autoComplete="password"
                  onChange={() => {
                    setPass(watch('currentPassword'))
                  }}
                />
                <FormErrorMessage>
                  {errors.currentPassword && errors.currentPassword.message}
                </FormErrorMessage>
              </FormControl>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme="cyan" mr={3} type="submit">
              Change Password
            </Button>

            <Button onClick={onClose} variant="outline" colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
