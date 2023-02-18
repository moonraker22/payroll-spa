import { type WeeksType } from '@/stores/store'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import { WeekDisplay } from './WeekDisplay'

interface WeekModalProps {
  filterDate: [] | WeeksType[]
  isOpen: boolean
  onClose: () => void
}

export default function WeekModal({
  filterDate,
  isOpen,
  onClose,
}: WeekModalProps): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} variant="floating">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {filterDate?.map((week, index) => (
              <div key={index}>
                <WeekDisplay
                  totalMiles={week.totalMiles}
                  totalPay={week.totalPay}
                  backhaul={week.backhaul}
                  weekStart={Date.parse(week?.weekStart).toString()}
                  weekEnd={Date.parse(week?.weekEnd).toString()}
                />
              </div>
            ))}
            {filterDate.length === 0 && <Box>No data for this week</Box>}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="cyan"
              type="submit"
              variant="outline"
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
