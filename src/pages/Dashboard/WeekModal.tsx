import { WeekDisplay } from './WeekDisplay'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from '@chakra-ui/react'

export default function WeekModal({ filterDate, isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} variant="floating">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {filterDate &&
              filterDate?.map((week, index) => (
                <div key={index}>
                  <WeekDisplay
                    totalMiles={week.totalMiles}
                    totalPay={week.totalPay}
                    totalBackHaulPay={week.backhaul}
                    weekStartDate={Date.parse(week?.weekStart).toString()}
                    weekEndDate={Date.parse(week?.weekEnd).toString()}
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
