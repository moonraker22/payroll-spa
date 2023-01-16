import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'
import { devtools, derive } from 'valtio/utils'

const state: State = {
  userId: '',
  userEmail: '',
  isSignedIn: false,
  avatar: '',
  paysheets: [],
  weeks: [],
  weeksTmp: [],
  // paysheet: {},
  filterPaysheets: '',
  // offset: 0,
  // currentItems: [], // current items to display
}
const store = proxy(state)

devtools(store, 'Payroll')

export { store, useSnapshot }

interface State {
  userId: string
  userEmail: string
  isSignedIn: boolean
  avatar: string
  paysheets: Paysheet[]
  weeks: Weeks[]
  weeksTmp: any[]
  // paysheet: any
  filterPaysheets: string
  // offset: number
  // currentItems: any[]
}

interface Weeks {
  weekStart: string
  weekEnd: string
  totalMiles: number
  payMiles: number
  totalPay: number
  startingMiles: number
  endingMiles: number
  backhaul: number
}

interface Paysheet {
  uid: string
  date: number
  startingMiles: number
  endingMiles: number
  payMiles: number
  totalMiles: number
  backhaul: number
}
