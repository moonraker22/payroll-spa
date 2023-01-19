import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  useColorModeValue,
  useConst,
} from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, useLocation } from 'react-router-dom'
// import { DevTool } from '@hookform/devtools'
import { Paysheet } from '@/data/paySchema'
import { useAddPay } from '@/hooks/usePay'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { motion as m } from 'framer-motion'

const DailyForm = () => {
  const location = useLocation()
  const day = location?.state

  const date = useConst(new Date().toISOString().slice(0, 10))

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

  const { addPay } = useAddPay()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting, isValid },
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
  const placeholderColor = useColorModeValue('gray.400', 'gray.500')

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
  // console.log(new Date(1673654400000), 'date')
  // console.log(new Date(), 'today date')
  // console.log(getValues('date'), 'date')
  const textColor = useColorModeValue('gray.800', 'gray')

  return (
    <m.div
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: [0.9, 1.2, 1] }}
      transition={{
        type: 'spring',
        stiffness: 90,

        damping: 15,
      }}
      exit={{ opacity: 0 }}
    >
      <Box
        bg={bg}
        border="2px"
        borderColor="cyan.600"
        boxShadow="dark-lg"
        p="4"
        rounded="md"
        mt={10}
        mb={10}
        // bgGradient="linear(to-l, #111621, #1A202C)"
        w="60vw"
        maxW="500px"
        minW="350px"
      >
        <Box p="4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={errors.date ? true : false}
              isRequired
              variant="floating"
            >
              <Input
                {...register('date')}
                id="date"
                type="date"
                placeholder="date"
                mb="3"
                mt="3"
                _placeholder={{ color: placeholderColor }}
              />
              <FormLabel htmlFor="date">Date</FormLabel>
              <FormErrorMessage>
                {errors.date && errors.date.message}
              </FormErrorMessage>
            </FormControl>

            <Box my="3">
              <FormControl
                isInvalid={errors.startingMiles ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('startingMiles')}
                  id="startingMiles"
                  type="number"
                  placeholder="Starting Miles"
                  mb="3"
                  _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="startingMiles">Starting Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.startingMiles && errors.startingMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.endingMiles ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('endingMiles')}
                  id="endingMiles"
                  type="number"
                  placeholder="Ending Miles"
                  mb="3"
                  _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="endingMiles">Ending Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.endingMiles && errors.endingMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.totalMiles ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('totalMiles')}
                  id="totalMiles"
                  type="number"
                  placeholder="Total Miles"
                  disabled
                  mb="3"
                  _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="totalMiles">Total Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.totalMiles && errors.totalMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.payMiles ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('payMiles')}
                  id="payMiles"
                  type="number"
                  placeholder="Pay Miles"
                  mb="3"
                  _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="payMiles">Pay Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.payMiles && errors.payMiles.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.backhaul ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('backhaul')}
                  id="backhaul"
                  placeholder="BackHaul"
                  mb="3"
                  _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="backhaul">Backhaul:</FormLabel>
                <FormErrorMessage>
                  {errors.backhaul && errors.backhaul.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Flex>
              <Button
                mt={4}
                px={10}
                colorScheme="cyan"
                isLoading={isSubmitting}
                type="submit"
                disabled={!canSubmit}
                loadingText={day ? 'Updating' : 'Submitting'}
                variant="outline"
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
              >
                Submit
              </Button>
              <Spacer />
              <Button
                mt={4}
                colorScheme="red"
                onClick={() => reset()}
                disabled={isSubmitting}
                variant="outline"
                _hover={{
                  bg: 'red.600',
                  color: 'white',
                  scale: 1.1,
                }}
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

export type PaysheetInputs = {
  date: string
  startingMiles: string
  endingMiles: string
  totalMiles: number
  payMiles: string
  backhaul: string
}
