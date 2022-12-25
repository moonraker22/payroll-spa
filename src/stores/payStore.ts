import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  immer<State & Actions>((set, get) => ({
    pay: [
      // {
      //   id: '2021-01-01',
      //   date: '2021-01-01',
      //   startingMiles: 100,
      //   endingMiles: 200,
      //   totalMiles: 100,
      //   payMiles: 100,
      //   backhaul: 0,
      // },
    ],
    addPay: (pay: Pay) => {
      const currentStore = get()
      if (currentStore.pay.find((item) => item.id === pay.id)) {
        currentStore.pay = currentStore.pay.map((item) => {
          if (item.id === pay.id) {
            return pay
          }
          return item
        })
        return
      }
      set((state) => {
        state.pay.push(pay)
      })
    },
    week: [],
    addWeek: (week: Week) => {
      const currentStore = get()
      if (currentStore.week.find((item) => item.id === week.id)) {
        currentStore.week = currentStore.week.map((item) => {
          if (item.id === week.id) {
            return week
          }
          return item
        })
        return
      }
      set((state) => {
        state.week.push(week)
      })
    },
  }))
)

export default useStore

export interface Pay {
  id: string
  date: string
  startingMiles: number
  endingMiles: number
  totalMiles: number
  payMiles: number
  backhaul: number
}

type Actions = {
  addPay: (pay: Pay) => void
  addWeek: (week: Week) => void
}

type State = {
  pay: Pay[]
  week: Week[]
}

export interface Week {
  id: string
  weekStartingDate: string
  totalMiles: number
  payMiles: number
  backhaul: number
  totalPay: number
}
