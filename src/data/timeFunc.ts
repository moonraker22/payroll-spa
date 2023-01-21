//@ts-nocheck
//@moonraker22
export async function getWeeklyTotals(apiUrl) {
  // Fetch data from API
  const response = await fetch(apiUrl)
  const data = await response.json()

  // Create a dictionary to store the weekly totals
  const weeklyTotals = {}

  // Loop through the data and calculate the totals for each week
  for (const entry of data) {
    const date = new Date(entry.date)
    const weekNum = getWeekNumber(date)
    if (!(weekNum in weeklyTotals)) {
      weeklyTotals[weekNum] = {
        totalMiles: 0,
        pay: 0,
      }
    }
    weeklyTotals[weekNum].totalMiles += entry.totalMiles
    weeklyTotals[weekNum].pay += entry.pay
  }

  return weeklyTotals
}

function getWeekNumber(date) {
  // Set the day to Sunday
  date.setDate(date.getDate() - date.getDay())
  // Get the timestamp for the beginning of the week
  const weekStart = date.getTime()
  // Calculate the week number
  return Math.floor(weekStart / 604800000)
}

//--------------------

import { getISOWeek } from 'date-fns'

function sumTotalsByWeek(objects) {
  const totalsByWeek = {}

  objects.forEach((object) => {
    const week = getISOWeek(object.date)
    if (!totalsByWeek[week]) {
      totalsByWeek[week] = {
        totalMiles: 0,
        backhaul: 0,
      }
    }
    totalsByWeek[week].totalMiles += object.totalMiles
    totalsByWeek[week].backhaul += object.backhaul
  })

  return totalsByWeek
}
//his function uses the getISOWeek function from date-fns to determine the ISO week number for each object's date property. It then creates an empty object for that week if it doesn't already exist, and adds the totalMiles and backhaul values from the object to the corresponding properties in the week's object.

//For example, if you pass in the following array of objects:

const objects = [
  {
    id: 1,
    date: '2021-01-01',
    startingMiles: 100,
    endingMiles: 200,
    totalMiles: 100,
    backhaul: 0,
  },
  {
    id: 2,
    date: '2021-01-03',
    startingMiles: 200,
    endingMiles: 300,
    totalMiles: 100,
    backhaul: 1,
  },
  {
    id: 3,
    date: '2021-01-10',
    startingMiles: 300,
    endingMiles: 400,
    totalMiles: 100,
    backhaul: 0,
  },
]
//Then the function would return the following object:

// {
//   1: { totalMiles: 200, backhaul: 1 },
//   2: { totalMiles: 100, backhaul: 0 },
// }
//This object has properties for weeks 1 and 2, with the total totalMiles and backhaul values for each week.
