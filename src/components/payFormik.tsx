import { useState } from 'react'
import { Formik } from 'formik'
import { Card, Divider, Input, Heading, Button } from 'dracula-ui'

const PayFormik = () => {
  const [date, setDate] = useState('')
  const [startingMiles, setStartingMiles] = useState('')
  const [endingMiles, setEndingMiles] = useState('')
  const [totalMiles, setTotalMiles] = useState('')
  const [backhaul, setBackhaul] = useState('')

  return (
    <div>
      <Card>
        <Formik
          initialValues={{
            date: '',
            startingMiles: '',
            endingMiles: '',
            totalMiles: '',
            backhaul: '',
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading>Payroll</Heading>
              <Divider />
              <Input
                placeholder="Date"
                type="date"
                value={values.date}
                required
                onChange={handleChange('date')}
              />
              <Input
                placeholder="Starting Miles"
                value={values.startingMiles}
                required
                onChange={handleChange('startingMiles')}
              />
              <Input
                placeholder="Ending Miles"
                value={values.endingMiles}
                required
                onChange={handleChange('endingMiles')}
              />
              <Input
                placeholder="Total Miles"
                value={values.totalMiles}
                required
                onChange={handleChange('totalMiles')}
                disabled
              />
              <Input
                placeholder="Backhaul"
                type="number"
                value={values.backhaul}
                required
                onChange={handleChange('backhaul')}
              />
              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default PayFormik
