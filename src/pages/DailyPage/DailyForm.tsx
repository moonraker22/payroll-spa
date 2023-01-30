import { Paysheet, PaysheetType } from '@/data/paySchema'
import { useAddPay } from '@/hooks/usePay'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Spacer,
  useColorModeValue,
  useConst,
} from '@chakra-ui/react'
// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { DocumentData } from 'firebase/firestore'
import { motion as m } from 'framer-motion'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GiCancel } from 'react-icons/gi'
import { TiLightbulb } from 'react-icons/ti'
import { Form, useLocation } from 'react-router-dom'

const DailyForm = () => {
  const location = useLocation()
  const day = location?.state
  const bg = useColorModeValue('white', ' gray.800')
  // const placeholderColor = useColorModeValue('gray.400', 'gray.500')

  const date = useConst(new Date().toISOString().slice(0, 10))

  const defaultValuesFunc = (day: DocumentData) => {
    if (day) {
      return {
        date: format(day.date, 'yyyy-MM-dd'),
        startingMiles: day.startingMiles,
        endingMiles: day.endingMiles,
        totalMiles: day.totalMiles,
        payMiles: day.payMiles,
        backhaul: day.backhaul,
        delayHours: day.delayHours,
      }
    } else {
      return {
        date: date,
      }
    }
  }
  // const defaultValuesFunc = (day: DocumentData) => {
  //   if (day) {
  //     return {
  //       date: format(day.date, 'yyyy-MM-dd'),
  //       startingMiles: `${day.startingMiles}`,
  //       endingMiles: `${day.endingMiles}`,
  //       totalMiles: day.totalMiles,
  //       payMiles: `${day.payMiles}`,
  //       backhaul: `${day.backhaul}`,
  //       delayHours: `${day.delayHours}`,
  //     }
  //   } else {
  //     return {
  //       date: date,
  //     }
  //   }
  // }

  // const defaultValues = defaultValuesFunc(day)

  const { addPay } = useAddPay()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting, isValid },
    reset,
    getValues,
    setValue,
    setFocus,
  } = useForm<PaysheetType>({
    // defaultValues,
    resolver: zodResolver(Paysheet),
  })
  const onSubmit: SubmitHandler<PaysheetType> = (data) => {
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

  // useEffect(() => {
  //   setFocus('startingMiles')
  // }, [])

  const canSubmit = !Object.keys(errors).length && !isSubmitting

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
        bg={bg}
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
                defaultValue={
                  day?.date ? format(day?.date, 'yyyy-MM-dd') : date
                }
                // _placeholder={{ color: placeholderColor }}
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
                  defaultValue={
                    day?.startingMiles ? day?.startingMiles : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
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
                  defaultValue={
                    day?.endingMiles ? Number(day?.endingMiles) : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
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
                  {...register('totalMiles', {
                    valueAsNumber: true,
                    required: false,
                  })}
                  id="totalMiles"
                  type="number"
                  placeholder="Total Miles"
                  disabled
                  // mb="3"
                  defaultValue={
                    day?.totalMiles ? Number(day?.totalMiles) : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="totalMiles">Total Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.totalMiles && errors.totalMiles.message}
                </FormErrorMessage>
                <FormHelperText ml="10">
                  <Icon as={TiLightbulb} w={3} h={3} /> Total miles are
                  automatically calculated
                </FormHelperText>
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
                  defaultValue={
                    day?.payMiles ? Number(day?.payMiles) : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
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
                // isRequired
                variant="floating"
              >
                <Input
                  {...register('backhaul')}
                  id="backhaul"
                  placeholder="BackHaul"
                  mb="3"
                  type={'number'}
                  defaultValue={
                    day?.backhaul ? Number(day?.backhaul) : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="backhaul" optionalIndicator>
                  Backhaul:
                </FormLabel>
                <FormErrorMessage>
                  {errors.backhaul && errors.backhaul.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.delayHours ? true : false}
                variant="floating"
              >
                <Input
                  {...register('delayHours')}
                  id="delayHours"
                  placeholder="Delay Hours"
                  // mb="3"
                  type={'number'}
                  step=".01"
                  defaultValue={
                    day?.delayHours ? Number(day?.delayHours) : undefined
                  }
                  // _placeholder={{ color: placeholderColor }}
                />
                <FormLabel htmlFor="delayHours" optionalIndicator>
                  Delay Hours:
                </FormLabel>
                <FormErrorMessage>
                  {errors.delayHours && errors.delayHours.message}
                </FormErrorMessage>
                <FormHelperText ml="10">
                  <Icon as={TiLightbulb} w={3} h={3} /> Delay is decimal 45min =
                  .75
                </FormHelperText>
              </FormControl>
            </Box>
            <Flex>
              <Button
                mt={4}
                px={5}
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
                rightIcon={<ArrowForwardIcon />}
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
                  bg: 'red.400',
                  color: 'white',
                  scale: 1.1,
                }}
                rightIcon={<GiCancel />}
              >
                Reset
              </Button>
            </Flex>
          </Form>
        </Box>
        {/* {import.meta.env.DEV && <DevTool control={control} />} */}
      </Box>
    </m.div>
  )
}

export default DailyForm

// export type PaysheetInputs = {
//   date: string
//   startingMiles: number
//   endingMiles: number
//   totalMiles: number
//   payMiles: number
//   backhaul: number
//   delayHours: number
// }
export type PaysheetInputs = {
  date: string
  startingMiles: string
  endingMiles: string
  totalMiles: number
  payMiles: string
  backhaul: string
  delayHours: string
}
