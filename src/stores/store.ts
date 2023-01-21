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

if (import.meta.env.DEV) devtools(store, 'Payroll')

const useStore = () => useSnapshot(store)

const storeActions: StoreActionsType = {
  setUserId: (id: string) => {
    store.userId = id
  },
  setUserEmail: (email: string) => {
    store.userEmail = email
  },
  setIsSignedIn: (isSignedIn: boolean) => {
    store.isSignedIn = isSignedIn
  },
  setAvatar: (avatar: string) => {
    store.avatar = avatar
  },
  setPaysheets: (paysheets: PaysheetType[]) => {
    store.paysheets = paysheets
  },
  setWeeks: (weeks: WeeksType[]) => {
    store.weeks = weeks
  },
  setWeekData: (weekData: WeekDataType) => {
    store.weekData = weekData
  },
  clear: () => {
    store.userId = ''
    store.userEmail = ''
    store.isSignedIn = false
    store.avatar = ''
    store.paysheets = []
    store.weeks = []
    store.weekData = {
      startDate: new Date(),
      endDate: new Date(),
      weekStartFormat: '',
      weekEndFormat: '',
    }
  },
}

export { store, useStore, storeActions }

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

export interface StoreActionsType {
  setUserId: (id: string) => void
  setUserEmail: (email: string) => void
  setIsSignedIn: (isSignedIn: boolean) => void
  setAvatar: (avatar: string) => void
  setPaysheets: (paysheets: PaysheetType[]) => void
  setWeeks: (weeks: WeeksType[]) => void
  setWeekData: (weekData: WeekDataType) => void
  clear: () => void
}
