import { DateFilterSchema, DateFilterType } from '@/data/paySchema'
import { store } from '@/stores/store'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isWithinInterval } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import WeekModal from './WeekModal'

export default function FilterField() {
  const snap = useSnapshot(store)
  const textColor = useColorModeValue('gray.800', 'gray')
  const [filterDate, setFilterDate] = useState([])

  const {
    register,
    handleSubmit,

    formState: { isSubmitting, isDirty, errors, isValid, touchedFields },
  } = useForm<DateFilterType>({
    resolver: zodResolver(DateFilterSchema),
  })

  function onSubmit(data: DateFilterType) {
    findDate(data.date)
    onOpen()
  }

  function findDate(date) {
    const found = snap.weeks.filter((week) => {
      if (
        isWithinInterval(new Date(date), {
          start: new Date(week.weekStart),
          end: new Date(week.weekEnd),
        })
      ) {
        return week
      }
    })
    setFilterDate(found)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Flex px="5" w="90%">
            <FormControl
              isInvalid={errors.date ? true : false}
              isRequired
              variant="floating"
            >
              <Input
                type="date"
                {...register('date')}
                placeholder="Date"
                mb="3"
                _placeholder={{ color: textColor }}
                boxShadow="lg"
              />
              <FormLabel>Search Date</FormLabel>
              <FormErrorMessage>
                {errors.date && errors.date?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              ml="5"
              colorScheme="cyan"
              isLoading={isSubmitting}
              type="submit"
              disabled={!isDirty || !isValid}
              loadingText={'Submitting'}
              variant="outline"
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
              boxShadow="lg"
            >
              Filter
            </Button>
          </Flex>
        </Center>
      </Form>
      <WeekModal filterDate={filterDate} onClose={onClose} isOpen={isOpen} />
    </>
  )
}
