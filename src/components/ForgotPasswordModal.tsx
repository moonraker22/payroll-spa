import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
} from '@chakra-ui/react'
import { usePasswordReset } from '../hooks/usePasswordReset'
import { EmailSchema, EmailType } from '@/data/paySchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'react-router-dom'

function ForgotPasswordModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { passwordResetEmail } = usePasswordReset()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
    control,
    reset,
    getValues,
    setValue,
    setFocus,
  } = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
  })

  const onSubmit: SubmitHandler<EmailType> = (data: EmailType) => {
    passwordResetEmail(data.email)
  }
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              {...register('email')}
              placeholder="Email"
            />
            <button type="submit">Submit</button>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ForgotPasswordModal
