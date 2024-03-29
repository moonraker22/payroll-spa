import { Paysheet, type PaysheetType } from '@/data/paySchema'
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
import { motion as m } from 'framer-motion'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { GiCancel } from 'react-icons/gi'
import { TiLightbulb } from 'react-icons/ti'
import { Form, useLocation } from 'react-router-dom'

const DailyForm: () => JSX.Element = () => {
  const location = useLocation()
  const day = location?.state as PaysheetType
  const bg = useColorModeValue('white', ' gray.800')
  // const placeholderColor = useColorModeValue('gray.400', 'gray.500')

  const date = useConst(new Date().toISOString().slice(0, 10))

  const { addPay, payError } = useAddPay()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
  } = useForm<PaysheetType>({
    resolver: zodResolver(Paysheet),
  })
  const onSubmit: SubmitHandler<PaysheetType> = (data) => {
    try {
      addPay({ ...data }).catch((error) => {
        console.error(error)
        console.error(payError)
      })
      reset()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
        console.error(error)
        console.error(payError)
      }
    }
  }

  const totalMilesFunc: () => void = () => {
    const startingMiles = Number(getValues('startingMiles'))
    const endingMiles = Number(getValues('endingMiles'))
    const totalMiles =
      endingMiles - startingMiles > 0 ? endingMiles - startingMiles : 0
    setValue('totalMiles', totalMiles)
  }

  useEffect(() => {
    totalMilesFunc()
  }, [watch('startingMiles'), watch('endingMiles')])

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting

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
        w="60vw"
        maxW="500px"
        minW="350px"
        bg={bg}
      >
        <Box p="4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={errors.date != null}
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
                  day?.date > 0 ? format(day?.date, 'yyyy-MM-dd') : date
                }
              />
              <FormLabel htmlFor="date">Date</FormLabel>
              <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
            </FormControl>

            <Box my="3">
              <FormControl
                isInvalid={errors.startingMiles != null}
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
                    day?.startingMiles >= 0 ? day?.startingMiles : undefined
                  }
                />
                <FormLabel htmlFor="startingMiles">Starting Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.startingMiles?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.endingMiles != null}
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
                    day?.endingMiles >= 0 ? Number(day?.endingMiles) : undefined
                  }
                />
                <FormLabel htmlFor="endingMiles">Ending Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.endingMiles?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.totalMiles != null}
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
                    day?.totalMiles >= 0 ? Number(day?.totalMiles) : undefined
                  }
                />
                <FormLabel htmlFor="totalMiles">Total Miles:</FormLabel>
                <FormErrorMessage>
                  {errors.totalMiles?.message}
                </FormErrorMessage>
                <FormHelperText ml="10">
                  <Icon as={TiLightbulb} w={3} h={3} /> Total miles are
                  automatically calculated
                </FormHelperText>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.payMiles != null}
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
                    day?.payMiles >= 0 ? Number(day?.payMiles) : undefined
                  }
                />
                <FormLabel htmlFor="payMiles">Pay Miles:</FormLabel>
                <FormErrorMessage>{errors.payMiles?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.backhaul != null}
                variant="floating"
              >
                <Input
                  {...register('backhaul')}
                  id="backhaul"
                  placeholder="BackHaul"
                  mb="3"
                  type={'number'}
                  step=".01"
                  defaultValue={
                    day?.backhaul >= 0 ? Number(day?.backhaul) : undefined
                  }
                />
                <FormLabel htmlFor="backhaul" optionalIndicator>
                  Backhaul:
                </FormLabel>
                <FormErrorMessage>{errors.backhaul?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={errors.delayHours != null}
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
                    day?.delayHours >= 0 ? Number(day?.delayHours) : undefined
                  }
                />
                <FormLabel htmlFor="delayHours" optionalIndicator>
                  Delay Hours:
                </FormLabel>
                <FormErrorMessage>
                  {errors.delayHours?.message}
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
                loadingText={
                  day?.totalMiles !== null ? 'Updating' : 'Submitting'
                }
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
                onClick={() => {
                  reset()
                }}
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

// export interface PaysheetInputs {
//   date: string
//   startingMiles: string
//   endingMiles: string
//   totalMiles: number
//   payMiles: string
//   backhaul: string
//   delayHours: string
// }
