import { useRef, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import { Card, Divider, Input, Heading, Button, Box } from 'dracula-ui'
import {
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Container,
  Text,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paysheet, PaysheetType } from '../data/paySchema'
import useStore from '../stores/payStore'

type PaysheetInputs = {
  id: number
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

const ReactHookForm = () => {
  const totMilesRef = useRef<HTMLInputElement>(null)
  const zstore = useStore((state) => state.pay)
  const addPayroll = useStore((state) => state.addPay)
  console.log(zstore, 'zstore')

  const testData = {
    id: 1,
    date: '2021-01-01',
    startingMiles: 100,
    endingMiles: 200,
    totalMiles: 100,
    backhaul: 0,
  }
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
    setError,
    getFieldState,
  } = useForm<PaysheetInputs>({
    defaultValues,
    resolver: zodResolver(Paysheet),
  })
  const onSubmit: SubmitHandler<PaysheetInputs> = (data) => addPayroll(data)

  console.log(errors) // watch input value by passing the name of it
  // console.log(getValues('startingMiles'))
  const totalMilesFunc = () => {
    const startingMiles = Number(getValues('startingMiles'))
    const endingMiles = Number(getValues('endingMiles'))
    const totalMiles = endingMiles - startingMiles
    setValue('totalMiles', totalMiles)
  }

  useEffect(() => {
    totalMilesFunc()
  }, [watch('startingMiles'), watch('endingMiles')])

  useEffect(() => {
    setFocus('startingMiles')
  }, [])

  return (
    <Container maxW="2xl" centerContent>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Payroll
      </Text>
      <Divider color="cyan" />
      <SimpleGrid columns={1} spacing={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Controller
          name="date"
          control={control}
          render={({ field }) => <Input {...field} />}
        /> */}
          <input type="hidden" value={new Date().toISOString()} />
          <FormControl isInvalid={errors?.date?.message !== ''}>
            <Input
              {...register('date', { required: true })}
              placeholder="date"
              type={'date'}
              color="fuchsia"
            />
            <FormErrorMessage>{errors?.date?.message}</FormErrorMessage>
          </FormControl>
          <Input
            {...register('startingMiles', {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            color="cyan"
            placeholder="Starting Miles"
          />
          <Input
            {...register('endingMiles', {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            color="cyan"
            placeholder="Ending Miles"
            onBlur={totalMilesFunc}
          />
          <Input
            {...register('totalMiles', {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            color="cyan"
            placeholder="Total Miles"
            disabled
          />
          <Input
            {...register('payMiles', { required: true, valueAsNumber: true })}
            type="number"
            color="cyan"
            placeholder="Pay Miles"
          />
          <Input
            {...register('backhaul', {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            color="cyan"
            placeholder="Backhaul"
          />
          {errors?.backhaul?.message && <div>This field is required</div>}

          <Button variant="outline" color="animated">
            Submit
          </Button>
        </form>
      </SimpleGrid>
      <DevTool control={control} />
    </Container>
  )
}

export default ReactHookForm
