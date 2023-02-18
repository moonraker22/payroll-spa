import { DateFilterSchema, type DateFilterType } from '@/data/paySchema'
import { useStore, type WeeksType } from '@/stores/store'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Hide,
  IconButton,
  Input,
  Show,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isWithinInterval } from 'date-fns'
import { useCallback, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoFilterSharp } from 'react-icons/io5'
import { Form } from 'react-router-dom'
import WeekModal from './WeekModal'

export default function FilterField(): JSX.Element {
  const snap = useStore()
  const textColor = useColorModeValue('gray.800', 'gray')
  const [filterDate, setFilterDate] = useState<[] | WeeksType[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,

    formState: { isSubmitting, isDirty, errors, isValid },
  } = useForm<DateFilterType>({
    resolver: zodResolver(DateFilterSchema),
  })

  const onSubmit: SubmitHandler<DateFilterType> = async (data) => {
    findDate(data.date)
    onOpen()
  }

  const findDate = useCallback(
    (date: number) => {
      const found = snap.weeks.filter((week) => {
        if (
          isWithinInterval(new Date(date), {
            start: new Date(week.weekStart),
            end: new Date(week.weekEnd),
          })
        ) {
          return week
        }
        return null
      })
      setFilterDate(found)
    },
    [snap.weeks]
  )

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Flex px="5" w="90%">
            <FormControl
              isInvalid={errors.date != null}
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
              <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
            </FormControl>
            <Hide below="md">
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
                _disabled={{
                  color: 'cyan.300',
                }}
                boxShadow="lg"
                rightIcon={<IoFilterSharp />}
              >
                Filter
              </Button>
            </Hide>
            <Show below="md">
              <IconButton
                ml="5"
                colorScheme="cyan"
                isLoading={isSubmitting}
                type="submit"
                disabled={!isDirty || !isValid}
                aria-label="Filter"
                // loadingText={'Submitting'}
                variant="outline"
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                _disabled={{
                  color: 'cyan.300',
                }}
                boxShadow="lg"
                icon={<IoFilterSharp fontSize="1.25rem" />}
              ></IconButton>
            </Show>
          </Flex>
        </Center>
      </Form>
      <WeekModal filterDate={filterDate} onClose={onClose} isOpen={isOpen} />
    </>
  )
}
