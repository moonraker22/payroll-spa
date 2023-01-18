import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'
import { devtools, derive } from 'valtio/utils'

const state: State = {
  userId: '',
  userEmail: '',
  isSignedIn: false,
  avatar: '',
  paysheets: [],
  weeks: [],
}
const store = proxy(state)

devtools(store, 'Payroll')

export { store, useSnapshot }

interface State {
  userId: string
  userEmail: string
  isSignedIn: boolean
  avatar: string
  paysheets: PaysheetType[]
  weeks: WeeksType[]
}

export interface WeeksType {
  weekStart: string
  weekEnd: string
  totalMiles: number
  payMiles: number
  totalPay: number
  startingMiles: number
  endingMiles: number
  backhaul: number
}

interface PaysheetType {
  uid: string
  date: number
  startingMiles: number
  endingMiles: number
  payMiles: number
  totalMiles: number
  backhaul: number
}
