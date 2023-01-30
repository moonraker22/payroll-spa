import { PTOSchema, PTOType } from '@/data/paySchema'
import { usePTO } from '@/hooks/usePTO'
import { useStore } from '@/stores/store'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  MdOutlineArrowCircleDown,
  MdOutlineArrowCircleUp,
} from 'react-icons/md'
import { Form } from 'react-router-dom'

export default function PTOCount() {
  const { addPTO, subtractPTO } = usePTO()
  const snap = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
    reset,
    setFocus,
  } = useForm<PTOType>({
    resolver: zodResolver(PTOSchema),
  })

  const onAdd: SubmitHandler<PTOType> = (data) => {
    try {
      addPTO(data)
      reset()
    } catch (error: any) {
      console.log(error)
    }
  }
  const onSubtract: SubmitHandler<PTOType> = (data) => {
    try {
      subtractPTO(data)
      reset()
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFocus('days')
  }, [])

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
      <VStack border="1px" borderColor={'gray.500'} p="15px" rounded={'lg'}>
        <Box>
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
          <Text color="gray.400" my="5px">
            Keep track of how many days you've used
          </Text>

          <Text textAlign={'center'} my="10px">
            Days used this year: {snap.pto}
          </Text>
        </Box>
        <Box>
          <Form>
            <FormControl
              variant="floating"
              isInvalid={errors?.days ? true : false}
            >
              <FormLabel htmlFor="pto">Enter days used</FormLabel>
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
