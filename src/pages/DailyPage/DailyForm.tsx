import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, useLocation } from 'react-router-dom'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Center,
  useColorModeValue,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paysheet } from '@/data/paySchema'
import { useAddPay } from '@/hooks/usePay'
import { format } from 'date-fns'
import { motion as m } from 'framer-motion'

type PaysheetInputs = {
  date: string
  startingMiles: string
  endingMiles: string
  totalMiles: number
  payMiles: string
  backhaul: string
}

const DailyForm = () => {
  const location = useLocation()
  const day = location?.state?.day

  const date = new Date().toISOString().slice(0, 10)

  const defaultValuesFunc = (day) => {
    if (day) {
      return {
        date: format(day.date, 'yyyy-MM-dd'),
        startingMiles: `${day.startingMiles}`,
        endingMiles: `${day.endingMiles}`,
        totalMiles: day.totalMiles,
        payMiles: `${day.payMiles}`,
        backhaul: `${day.backhaul}`,
      }
    } else {
      return {
        date: date,
      }
    }
  }

  const defaultValues = defaultValuesFunc(day)

  const { addPay, isPayLoading, payError } = useAddPay()

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
  } = useForm<PaysheetInputs>({
    defaultValues,
    resolver: zodResolver(Paysheet),
  })
  const onSubmit: SubmitHandler<PaysheetInputs> = (data) => {
    try {
      addPay({ ...data })
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const totalMilesFunc = () => {
    const startingMiles = Number(getValues('startingMiles'))
    const endingMiles = Number(getValues('endingMiles'))
    const totalMiles =
      endingMiles - startingMiles > 0 ? endingMiles - startingMiles : 0
    setValue('totalMiles', totalMiles)
  }

  useEffect(() => {
    totalMilesFunc()
  }, [watch('startingMiles'), watch('endingMiles')])

  useEffect(() => {
    setFocus('startingMiles')
  }, [])

  const bg = useColorModeValue('white', ' gray.800')

  const canSubmitFunc = useCallback(
    function () {
      if (day) {
        return true
      } else {
        return (
          isDirty && isValid && !isSubmitting && !Object.keys(errors).length
        )
      }
    },
    [isDirty, isValid, isSubmitting, errors, day]
  )
  const canSubmit = canSubmitFunc()

  return (
    <m.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Box
        bg={bg}
        border="2px"
        borderColor="cyan.700"
        boxShadow="dark-lg"
        p="4"
        rounded="md"
        mt={10}
        mb={10}
        // bgGradient="linear(to-l, #111621, #1A202C)"
        w="60vw"
        maxW="500px"
        minW="300px"
      >
        <Box p="4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.date ? true : false} isRequired>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                {...register('date')}
                id="date"
                type="date"
                placeholder="date"
              />
              <FormErrorMessage>
                {errors.date && errors.date.message}
              </FormErrorMessage>
            </FormControl>

            <Box my="3">
              <FormControl
                isInvalid={errors.startingMiles ? true : false}
                isRequired
              >
                <FormLabel htmlFor="startingMiles">Starting Miles:</FormLabel>
                <Input
                  {...register('startingMiles')}
                  id="startingMiles"
                  type="number"
                  placeholder="Starting Miles"
                />
                <FormErrorMessage>
                  {errors.startingMiles && errors.startingMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.endingMiles ? true : false}
                isRequired
              >
                <FormLabel htmlFor="endingMiles">Ending Miles:</FormLabel>
                <Input
                  {...register('endingMiles')}
                  id="endingMiles"
                  type="number"
                  placeholder="Ending Miles"
                />
                <FormErrorMessage>
                  {errors.endingMiles && errors.endingMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.totalMiles ? true : false}
                isRequired
              >
                <FormLabel htmlFor="totalMiles">Total Miles:</FormLabel>
                <Input
                  {...register('totalMiles')}
                  id="totalMiles"
                  type="number"
                  placeholder="Total Miles"
                  disabled
                />
                <FormErrorMessage>
                  {errors.totalMiles && errors.totalMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.payMiles ? true : false}
                isRequired
              >
                <FormLabel htmlFor="payMiles">Pay Miles:</FormLabel>
                <Input
                  {...register('payMiles')}
                  id="payMiles"
                  type="number"
                  placeholder="Pay Miles"
                />
                <FormErrorMessage>
                  {errors.payMiles && errors.payMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.backhaul ? true : false}
                isRequired
              >
                <FormLabel htmlFor="backhaul">Backhaul:</FormLabel>
                <Input
                  {...register('backhaul')}
                  id="backhaul"
                  placeholder="BackHaul"
                />
                <FormErrorMessage>
                  {errors.backhaul && errors.backhaul.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Flex>
              <Button
                mt={4}
                px={10}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                disabled={!canSubmit}
                loadingText={day ? 'Updating' : 'Submitting'}
              >
                Submit
              </Button>
              <Spacer />
              <Button
                mt={4}
                colorScheme="red"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </Flex>
          </Form>
        </Box>
      </Box>
      {/* <DevTool control={control} /> */}
    </m.div>
  )
}

export default DailyForm
