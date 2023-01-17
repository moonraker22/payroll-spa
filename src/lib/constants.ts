// Firebase collection constants
export const COLLECTIONS = {
  USERS: 'users',
  PAYSHEETS: 'paysheets',
}

// Firebase collection string function
export function returnPaysheetString(id: string) {
  return `users/${id}/paysheets`
}

export const background = {
  light: 'white',
  dark: 'gray.800',
}

export const firebaseErrorCodes = {
  'auth/user-not-found': 'Check your credentials',
  'auth/email-already-in-use': 'That email is already in use',
  'auth/wrong-password': 'Check your credentials',
  'auth/weak-password': 'Password must be at least 6 characters',
}

export const firebaseErrorMap = new Map(Object.entries(firebaseErrorCodes))
