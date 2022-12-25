import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Form } from 'react-router-dom'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Container,
  Text,
  Center,
  Divider,
  useColorModeValue,
  Flex,
  Spacer,
  ButtonGroup,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paysheet, PaysheetType } from '../data/paySchema'
import useStore from '../stores/payStore'

type PaysheetInputs = {
  id: string
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
  const zstore = useStore((state) => state.pay)
  const addPayroll = useStore((state) => state.addPay)

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
    addPayroll(data)
    reset()
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

  const setId = () => {
    const date = getValues('date')
    console.log(date)

    setValue('id', date)
  }
  const bg = useColorModeValue('white', ' gray.800')
  return (
    <Container maxW="container.xl" centerContent mt={10}>
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
      >
        <Center>
          <Text
            // bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgGradient="linear(to-b, green.200, pink.500)"
            // bgGradient="linear(to-r, teal, red.500)"
            bgClip="text"
            fontSize={['3xl', '4xl', '5xl']}
            fontWeight="extrabold"
          >
            Daily Form
          </Text>
        </Center>
        <Divider mt={5} mb={5} />
        <Box>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.date ? true : false} isRequired>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                {...register('date')}
                id="date"
                type="date"
                placeholder="date"
                onBlur={setId}
              />
              <FormErrorMessage>
                {errors.date && errors.date.message}
              </FormErrorMessage>
            </FormControl>

            <Box>
              <FormControl
                isInvalid={errors.startingMiles ? true : false}
                isRequired
              >
                <input
                  {...register('id')}
                  type="hidden"
                  value={new Date().toISOString().slice(0, 10)}
                />

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
            <Box>
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
            <Box>
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
            <Box>
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
            <Box>
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
              <ButtonGroup gap="2">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  // onClick={() => addPayroll(testData)}
                >
                  Submit
                </Button>
                <Spacer />
                <Button mt={4} colorScheme="red" onClick={() => reset()}>
                  Reset
                </Button>
              </ButtonGroup>
            </Flex>
          </Form>
        </Box>
      </Box>
      <DevTool control={control} />
    </Container>
  )
}

export default DailyForm
