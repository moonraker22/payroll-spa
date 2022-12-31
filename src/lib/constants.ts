// Firebase collection constants
export const COLLECTIONS = {
  USERS: 'users',
  PAYSHEET: 'paysheet',
}

// Firebase collection string function
export function returnPaysheetString(id: string) {
  return `users/${id}/paysheet`
}
