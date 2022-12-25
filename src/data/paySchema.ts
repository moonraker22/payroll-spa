import { z } from 'zod'

//DailyPaySheet Schema
export const Paysheet = z.object({
  id: z.string(),
  date: z.string(),
  startingMiles: z.string().transform((value) => Number(value)),
  endingMiles: z.string().transform((value) => Number(value)),
  totalMiles: z.number().transform((value) => Number(value)),
  payMiles: z.string().transform((value) => Number(value)),
  backhaul: z.string().transform((value) => Number(value)),
})

export type PaysheetType = z.infer<typeof Paysheet>

// WeeklyPaySheet Schema
export const WeeklyPaysheet = z.object({
  id: z.string(),
  weekStartingDate: z.string(),
  totalMiles: z.string().transform((value) => Number(value)),
  payMiles: z.string().transform((value) => Number(value)),
  backhaul: z.string().transform((value) => Number(value)),
  totalPay: z.string().transform((value) => Number(value)),
})

export type WeeklyPaysheetType = z.infer<typeof WeeklyPaysheet>
