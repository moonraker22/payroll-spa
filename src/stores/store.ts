import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'
import { devtools } from 'valtio/utils'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebaseConf'

const store = proxy({
  userId: '',
  userEmail: '',
  isSignedIn: false,
  paysheets: [],
  paysheet: {},
  filterPaysheets: '',
})

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
