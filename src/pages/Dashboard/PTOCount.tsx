import { PTOSchema, PTOType } from '@/data/paySchema'
import { usePTO } from '@/hooks/usePTO'
import { useStore } from '@/stores/store'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  MdOutlineArrowCircleDown,
  MdOutlineArrowCircleUp,
} from 'react-icons/md'
import { Form } from 'react-router-dom'

export default function PTOCount() {
  const { addPTO, subtractPTO, ptoError } = usePTO()
  const snap = useStore()
  const countColor = useColorModeValue('cyan.800', 'cyan.300')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
    reset,
    setFocus,
  } = useForm<PTOType>({
    resolver: zodResolver(PTOSchema),
  })

  const onAdd: SubmitHandler<PTOType> = useCallback((data) => {
    try {
      addPTO(data)
      reset()
    } catch (error: any) {
      console.error(error.message)
      console.error(error)
      console.error(ptoError)
    }
  }, [])
  const onSubtract: SubmitHandler<PTOType> = useCallback((data) => {
    try {
      subtractPTO(data)
      reset()
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  // useEffect(() => {
  //   setFocus('days')
  // }, [])

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
      <VStack
        border="1px"
        borderColor={'cyan.600'}
        p="15px"
        rounded={'lg'}
        spacing="5px"
        maxW="300px"
        minW="300px"
      >
        {/* !Value is hardcoded */}
        <Heading
          as="h3"
          size="lg"
          textAlign={'center'}
          bgGradient="linear(to-b, #42047e, #07f49e)"
          bgClip="text"
        >
          Paid Time Off
        </Heading>
        <Divider variant={'dashed'} w="80%" />
        <Text color="gray.400" my="5px">
          Keep track of days you've used this year
        </Text>
        <Text textAlign={'center'} my="10px">
          You've used
        </Text>
        <Text color={countColor} fontSize="2xl" textAlign={'center'}>
          {snap.pto}
        </Text>{' '}
        <Text textAlign={'center'} my="10px">
          day
          {snap.pto === 1 ? '' : 's'} this year
        </Text>
        <Box>
          <Form>
            <FormControl
              variant="floating"
              isInvalid={errors?.days ? true : false}
            >
              <FormLabel htmlFor="pto">Number of days</FormLabel>
              <Input
                {...register('days')}
                placeholder="Number of Days"
                id="pto"
                mt="5px"
              />
              <FormErrorMessage>{errors.days?.message}</FormErrorMessage>
              <FormHelperText my="8px">
                Enter the number of days used
              </FormHelperText>
            </FormControl>
            <HStack spacing="10px" mt="10px" justifyContent="center">
              <Button
                // mt="5px"
                w="full"
                colorScheme="cyan"
                isLoading={isSubmitting}
                type="submit"
                size="full"
                py="10px"
                disabled={
                  isSubmitting ||
                  !isDirty ||
                  !isValid ||
                  Object.keys(errors).length > 0
                }
                loadingText="Logging In"
                variant={'outline'}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                _disabled={{
                  color: 'cyan.300',
                }}
                onClick={handleSubmit(onAdd)}
                rightIcon={<MdOutlineArrowCircleUp />}
              >
                Add
              </Button>
              <Button
                // mt="5px"
                w="full"
                colorScheme="red"
                isLoading={isSubmitting}
                type="submit"
                size="full"
                py="10px"
                disabled={
                  !isDirty ||
                  !isValid ||
                  isSubmitting ||
                  Object.keys(errors).length > 0
                }
                loadingText="Logging In"
                variant={'outline'}
                _hover={{
                  bg: 'red.400',
                  color: 'white',
                  scale: 1.1,
                }}
                _disabled={{
                  color: 'red.300',
                }}
                boxShadow="lg"
                onClick={handleSubmit(onSubtract)}
                rightIcon={<MdOutlineArrowCircleDown />}
              >
                Sub
              </Button>
            </HStack>
          </Form>
        </Box>
      </VStack>
    </m.div>
  )
}
