import { useState } from 'react'
import { Card, Divider, Input, Heading, Button } from 'dracula-ui'

const PayForm = () => {
  const [date, setDate] = useState('')
  const [startingMiles, setStartingMiles] = useState('')
  const [endingMiles, setEndingMiles] = useState('')
  const [totalMiles, setTotalMiles] = useState('')
  const [backhaul, setBackhaul] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    console.log(date, startingMiles, endingMiles, totalMiles, backhaul)
  }

  const totalMilesCalc = () => {
    if (startingMiles && endingMiles)
      setTotalMiles(() =>
        (Number(startingMiles) + Number(endingMiles)).toString()
      )
  }
  return (
    <div>
      <Card>
        <form>
          <Heading>Payroll</Heading>
          <Divider />
          <Input
            placeholder="Date"
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            placeholder="Starting Miles"
            value={startingMiles}
            required
            onChange={(e) =>
              setStartingMiles(Number(e.target.value).toString())
            }
            onBlur={totalMilesCalc}
          />
          <Input
            placeholder="Ending Miles"
            value={endingMiles}
            required
            onChange={(e) => setEndingMiles(Number(e.target.value).toString())}
            onBlur={totalMilesCalc}
          />
          <Input
            placeholder="Total Miles"
            value={totalMiles}
            required
            onChange={(e) => setTotalMiles(Number(e.target.value).toString())}
            disabled
          />
          <Input
            placeholder="Backhaul"
            type="number"
            step={0.01}
            value={backhaul}
            required
            onChange={(e) => setBackhaul(e.target.value)}
            onBlur={(e) =>
              setBackhaul((backhaul) => Number(backhaul).toFixed(2))
            }
          />
          <Button color="purpleCyan" m="sm" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default PayForm
