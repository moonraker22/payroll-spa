import { parseISO } from 'date-fns'
import { z } from 'zod'

//DailyPaySheet Schema
export const Paysheet = z.object({
  date: z.string().transform((value) => parseISO(value).getTime()),
  startingMiles: z
    .string()
    .transform((value) => Number(value))
    .or(z.number().nonnegative()),
  endingMiles: z
    .string()
    .transform((value) => Number(value.replace(/-|^0+/g, '')))
    .or(z.number().nonnegative()),
  totalMiles: z
    .number()
    .transform((value) => Number(value))
    .or(z.number().nonnegative()),
  payMiles: z
    .string()
    .transform((value) => Number(value.replace(/-|^0+/g, '')))
    .or(z.number().nonnegative()),
  backhaul: z
    .string()
    .transform((value) => Number(value.replace(/-|^0+/g, '')))
    .or(z.number().nonnegative()),
  delayHours: z
    .string()
    .transform((value) => Number(value.replace(/-|^0+/g, '')))
    .or(z.number().nonnegative()),
})

export type PaysheetType = z.infer<typeof Paysheet>

// regex for string to number to remove - and leading 0
// .transform((value) => Number(value.replace(/-|0/g, '')))

//regex to remove leading 0
// .transform((value) => Number(value.replace(/^0+/, '')))

// export const Paysheet = z.object({
//   date: z.string().transform((value) => parseISO(value).getTime()),
//   startingMiles: z.string().or(z.number().nonnegative()),
//   endingMiles: z.number(),
//   totalMiles: z.number(),
//   payMiles: z.number(),
//   backhaul: z.number(),
//   delayHours: z.number(),
// })

// export type PaysheetType = z.infer<typeof Paysheet>

// // WeeklyPaySheet Schema
// export const WeeklyPaysheet = z.object({
//   uid: z.string(),
//   weekStartingDate: z.string(),
//   totalMiles: z.string().transform((value) => Number(value)),
//   payMiles: z.string().transform((value) => Number(value)),
//   backhaul: z
//     .string()
//     .optional()
//     .transform((value) => Number(value)),
//   totalPay: z.string().transform((value) => Number(value)),
//   delayHours: z
//     .string()
//     .optional()
//     .transform((value) => Number(value)),
// })

// export type WeeklyPaysheetType = z.infer<typeof WeeklyPaysheet>

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
  isAdmin: z.boolean(),
  role: z.string(),
  displayName: z.string(),
})

export type UserType = z.infer<typeof UserSchema>

// Password Reset Schema
export const PasswordResetSchema = z.object({
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
  currentPassword: z.string().min(6),
})

export type PasswordResetType = z.infer<typeof PasswordResetSchema>

// User Update Schema
export const AvatarSchema = z.object({
  avatar: z.string().url(),
})

export type AvatarType = z.infer<typeof AvatarSchema>

// Password Prompt Schema
export const PasswordPromptSchema = z.object({
  currentPassword: z.string().min(6),
})

export type PasswordPromptType = z.infer<typeof PasswordPromptSchema>

// Email Schema
export const EmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export type EmailType = z.infer<typeof EmailSchema>

// Date filter Schema
export const DateFilterSchema = z.object({
  date: z.string().transform((value) => parseISO(value).getTime()),
})

export type DateFilterType = z.infer<typeof DateFilterSchema>

export const ChangeEmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6),
  newEmail: z.string().email({ message: 'Invalid email address' }),
})

export type ChangeEmailType = z.infer<typeof ChangeEmailSchema>

export const PTOSchema = z.object({
  days: z.string().transform((value) => Number(value)),
})

export type PTOType = z.infer<typeof PTOSchema>
