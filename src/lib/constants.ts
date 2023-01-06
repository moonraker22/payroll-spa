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
