import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

const devConfig = {
  apiKey: import.meta.env.VITE_PROD_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_PROD_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_PROD_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_PROD_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId:
    import.meta.env.VITE_PROD_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_PROD_FIREBASE_APP_ID || '',
}

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

const app = initializeApp(import.meta.env.DEV ? devConfig : config)

const auth = getAuth(app)
const db = getFirestore(app)

if (import.meta.env.DEV) {
  console.log('dev mode!!!!')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export { auth, db, app, googleProvider }
