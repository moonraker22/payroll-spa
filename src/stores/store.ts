import { proxy, useSnapshot } from 'valtio'
import { devtools } from 'valtio/utils'

const state: State = {
  userId: '',
  userEmail: '',
  isSignedIn: false,
  avatar: '',
  paysheets: [],
  weeks: [],
  weekData: {
    startDate: new Date(),
    endDate: new Date(),
    weekStartFormat: '',
    weekEndFormat: '',
  },
}
const store = proxy(state)

devtools(store, 'Payroll')

export { store, useSnapshot }

export interface State {
  userId: string
  userEmail: string
  isSignedIn: boolean
  avatar: string
  paysheets: PaysheetType[]
  weeks: WeeksType[]
  weekData: WeekDataType
}

export interface WeeksType extends PaysheetType {
  weekStart: string
  weekEnd: string
  finalMiles: number
  totalPay: number
}

export interface PaysheetType {
  uid: string
  date: number
  startingMiles: number
  endingMiles: number
  payMiles: number
  totalMiles: number
  backhaul: number
}

export interface WeekDataType {
  startDate: Date | null
  endDate: Date | null
  weekStartFormat: string
  weekEndFormat: string
}
