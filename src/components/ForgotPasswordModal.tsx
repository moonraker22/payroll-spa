import { EmailSchema, type EmailType } from '@/data/paySchema'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { usePasswordReset } from '../hooks/usePasswordReset'

function ForgotPasswordModal(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { passwordResetEmail } = usePasswordReset()
  const { register, handleSubmit } = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
  })

  const onSubmit: SubmitHandler<EmailType> = (data: EmailType) => {
    passwordResetEmail(data.email).catch((error) => {
      console.error(error)
    }
    )
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
