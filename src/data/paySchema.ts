import { z } from 'zod'

//DailyPaySheet Schema
export const Paysheet = z.object({
  // uid: z.string(),
  date: z.string().transform((value) => Date.parse(value)),
  startingMiles: z.string().transform((value) => Number(value)),
  endingMiles: z.string().transform((value) => Number(value)),
  totalMiles: z.number().transform((value) => Number(value)),
  payMiles: z.string().transform((value) => Number(value)),
  backhaul: z.string().transform((value) => Number(value)),
})

export type PaysheetType = z.infer<typeof Paysheet>

// WeeklyPaySheet Schema
export const WeeklyPaysheet = z.object({
  uid: z.string(),
  weekStartingDate: z.string(),
  totalMiles: z.string().transform((value) => Number(value)),
  payMiles: z.string().transform((value) => Number(value)),
  backhaul: z.string().transform((value) => Number(value)),
  totalPay: z.string().transform((value) => Number(value)),
})

export type WeeklyPaysheetType = z.infer<typeof WeeklyPaysheet>

// Auth Register Schema
export const Register = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
})

export type RegisterType = z.infer<typeof Register>

// Auth Login Schema
export const Login = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6),
})

export type LoginType = z.infer<typeof Login>

// User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  avatar: z.string(),
  date: z.string().transform((value) => Date.parse(value)),
})

export type UserType = z.infer<typeof UserSchema>

// Password Reset Schema
export const PasswordResetSchema = z.object({
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
  currentPassword: z.string().min(6),
})

export type PasswordResetType = z.infer<typeof PasswordResetSchema>

export const AvatarSchema = z.object({
  avatar: z.string().url(),
})

export type AvatarType = z.infer<typeof AvatarSchema>

export const PasswordPromptSchema = z.object({
  currentPassword: z.string().min(6),
})

export type PasswordPromptType = z.infer<typeof PasswordPromptSchema>
