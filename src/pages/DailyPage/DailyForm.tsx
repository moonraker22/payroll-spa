import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-router-dom'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Center,
  Divider,
  useColorModeValue,
  Flex,
  Spacer,
  ButtonGroup,
  Heading,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paysheet } from '../../data/paySchema'
import { useAddPay } from '../../hooks/usePay'
import { useAuth } from '../../hooks/useAuth'

type PaysheetInputs = {
  // uid: string
  date: string
  startingMiles: number
  endingMiles: number
  totalMiles: number
  payMiles: number
  backhaul: number
}

const defaultValues = {
  date: new Date().toISOString().slice(0, 10),
}

const DailyForm = () => {
  // const addPayroll = useStore(useCallback((state) => state.addPay, []))
  const { addPay, isPayLoading, payError } = useAddPay()
  // const { user, isLoading: isAuthLoading, error: authError } = useAuth()
  // const state = useStore((state) => {
  //   console.log('🚀 ~ file: DailyForm.tsx:42 ~ DailyForm ~ state', state)
  //   return state
  // })
  // const { user } = useStore()

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
      // addPayroll(data)
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

  // const setId = () => {
  //   const date = getValues('date')
  //   setValue('id', date)
  // }
  const bg = useColorModeValue('white', ' gray.800')

  const canSubmit =
    isDirty && isValid && !isSubmitting && !Object.keys(errors).length
  return (
    <>
      <Center>
        <Heading
          as="h1"
          // bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgGradient="linear(to-b, green.200, pink.500)"
          // bgGradient="linear(to-r, teal, red.500)"
          bgClip="text"
          fontSize={['4xl', '4xl', '5xl']}
          fontWeight="extrabold"
        >
          Daily Form
        </Heading>
      </Center>
      <Box
        bg={bg}
        border="2px"
        borderColor="gray.700"
        boxShadow="dark-lg"
        p="4"
        rounded="md"
        mt={10}
        mb={10}
        // bgGradient="linear(to-l, #111621, #1A202C)"
        w="60vw"
        maxW="600px"
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
                // onBlur={setId}
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
      <DevTool control={control} />
    </>
  )
}

export default DailyForm
