export const payTypes = {
  ADD_PAY: 'ADD_PAY',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case payTypes.ADD_PAY: {
      return [
        ...state,
        {
          id: action.id,
          date: action.date,
          startingMiles: action.startingMiles,
          endingMiles: action.endingMiles,
          totalMiles: action.totalMiles,
          backhaul: action.backhaul,
        },
      ]
    }
    default:
      return state
  }
}

export const initialState: Pay[] = [
  {
    id: 0,
    date: '',
    startingMiles: 0,
    endingMiles: 0,
    totalMiles: 0,
    backhaul: 0,
  },
]

interface Pay {
  id: number
  date: string
  startingMiles: number
  endingMiles: number
  totalMiles: number
  backhaul: number
}
