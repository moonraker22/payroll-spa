import { Container } from '@chakra-ui/react'
import DailyForm from './DailyForm'

export default function DailyPage() {
  return (
    <section>
      <Container maxW="container.xl" centerContent mt={10}>
        <DailyForm />
      </Container>
    </section>
  )
}
