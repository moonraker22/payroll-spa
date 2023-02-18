import { proxy, useSnapshot } from 'valtio'
import { devtools } from 'valtio/utils'

const state: State = {
  userId: '',
  userEmail: '',
  displayName: '',
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
  pto: 0,
}
const store = proxy(state)

if (import.meta.env.DEV) devtools(store, { name: 'Payroll Tracker' })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStore = () => useSnapshot(store)

const storeActions: StoreActionsType = {
  setUserId: (id: string) => {
    store.userId = id
  },
  setUserEmail: (email: string) => {
    store.userEmail = email
  },
  setDisplayName: (displayName: string) => {
    store.displayName = displayName
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
  setPto: (pto: number) => {
    store.pto = pto
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
    store.pto = 0
  },
}

export { store, useStore, storeActions }

export interface State {
  userId: string
  userEmail: string
  displayName: string
  isSignedIn: boolean
  avatar: string
  paysheets: PaysheetType[]
  weeks: WeeksType[]
  weekData: WeekDataType
  pto: number
}

interface WeekTypeWithId extends PaysheetType {
  weekStart: string
  weekEnd: string
  finalMiles: number
  totalPay: number
}
export type WeeksType = Omit<WeekTypeWithId, 'uid' | 'date'>

export interface PaysheetType {
  uid: string
  date: number
  startingMiles: number
  endingMiles: number
  payMiles: number
  totalMiles: number
  backhaul: number
  delayHours: number
  delayPay: number
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
  setDisplayName: (displayName: string) => void
  setIsSignedIn: (isSignedIn: boolean) => void
  setAvatar: (avatar: string) => void
  setPaysheets: (paysheets: PaysheetType[]) => void
  setWeeks: (weeks: WeeksType[]) => void
  setWeekData: (weekData: WeekDataType) => void
  setPto: (pto: number) => void
  clear: () => void
}
