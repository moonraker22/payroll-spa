import { useState } from 'react'
// import { useFormik } from 'formik'
import { Card, Divider, Input, Heading, Button } from 'dracula-ui'

// import { paySchema } from '../data/paySchema'

const PayUseFormik = () => {
  // const validate = () => {
  //   if (formik.values.startingMiles) {
  //     const startingMiles = Number(formik.values.startingMiles).toFixed(0)
  //     formik.setFieldValue('startingMiles', startingMiles)
  //   }
  //   if (formik.values.endingMiles) {
  //     const endingMiles = Number(formik.values.endingMiles).toFixed(0)
  //     formik.setFieldValue('endingMiles', endingMiles)
  //   }

  //   if (formik.values.startingMiles && formik.values.endingMiles) {
  //     const totalMiles =
  //       Number(formik.values.endingMiles) - Number(formik.values.startingMiles)
  //     formik.setFieldValue('totalMiles', totalMiles)
  //   }
  //   if (formik.values.backhaul) {
  //     const backhaul = Number(formik.values.backhaul).toFixed(2)
  //     formik.setFieldValue('backhaul', backhaul)
  //   }
  // }
  const date = new Date().toISOString().slice(0, 10)

  // const formik = useFormik({
  //   initialValues: {
  //     date: `${date}`,
  //     startingMiles: '',
  //     endingMiles: '',
  //     totalMiles: ``,
  //     payMiles: '',
  //     backhaul: '',
  //   },
  //   onSubmit: (values) => {
  //     console.log(values)
  //   },
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   validate,
  //   // validationSchema: paySchema,
  // })

  return (
    <div>
      {/* <Card>
        <form onSubmit={formik.handleSubmit}>
          <Heading>Payroll</Heading>
          <Divider />
          <Input
            placeholder="Date"
            type="date"
            value={formik.values.date}
            required
            {...formik.getFieldProps('date')}
          />
          <Input
            placeholder="Starting Miles"
            value={formik.values.startingMiles}
            required
            {...formik.getFieldProps('startingMiles')}
          />
          <Input
            placeholder="Ending Miles"
            value={formik.values.endingMiles}
            required
            {...formik.getFieldProps('endingMiles')}
          />
          <Input
            placeholder="Total Miles"
            value={formik.values.totalMiles}
            required
            {...formik.getFieldProps('totalMiles')}
            disabled
          />
          <Input
            placeholder="Pay Miles"
            value={formik.values.payMiles}
            required
            {...formik.getFieldProps('payMiles')}
          />
          <Input
            placeholder="Backhaul"
            type="number"
            value={formik.values.backhaul}
            required
            {...formik.getFieldProps('backhaul')}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card> */}
    </div>
  )
}

export default PayUseFormik
