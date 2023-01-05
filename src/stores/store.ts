import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'
import { devtools, derive } from 'valtio/utils'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebaseConf'

const store = proxy({
  userId: '',
  userEmail: '',
  isSignedIn: false,
  paysheets: [],
  weeks: [],
  paysheet: {},
  filterPaysheets: '',
})

// derive(
//   {
//     weeklyTotals: (get) => {
//       const weeks = get(store.weeks)
//       const weeklyTotals = []
//       weeks.forEach((week) => {
//         const totalMiles = week.totalMiles
//         const payMiles = week.payMiles
//         if (totalMiles > payMiles) {
//           weeklyTotals.push(totalMiles * 0.5)
//         } else {
//           weeklyTotals.push(payMiles * 0.5)
//         }
//       })
//     }
//   },
//   {
//     proxy: store,
//   }
// )
// const test = derive(
//   {
//     weeklyTotals: (get) => {
//       const weeks = get(store.weeks)
//       const weeklyTotals = []
//       weeks.forEach((week) => {
//         const totalMiles = week.totalMiles
//         const payMiles = week.payMiles
//         if (totalMiles > payMiles) {
//           weeklyTotals.push(totalMiles * 0.5)
//         } else {
//           weeklyTotals.push(payMiles * 0.5)
//         }
//       })
//     },
//   },
//   {
//     proxy: store,
//   }
// )
// console.log('test', test)

devtools(store, 'Payroll')

let unsubscribe: () => void

async function init() {
  unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      store.userId = user.uid
      store.userEmail = user.email
      store.isSignedIn = true
    } else {
      store.userId = ''
      store.userEmail = ''
      store.isSignedIn = false
    }
  })
}

init()

function unSubscribe() {
  unsubscribe()
}

subscribe(store, () => {
  if (!store.isSignedIn) {
    unSubscribe()
    // signOut(auth)
  }
})

export { store, useSnapshot, unSubscribe, snapshot }