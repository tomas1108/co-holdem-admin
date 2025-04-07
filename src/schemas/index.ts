import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  username: z.string().min(6, { message: 'Minimum 6 characters required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Minimum 6 characters required' }),
})

export const ChatItemSchema = z.object({
  content: z.string().min(1),
})

export const UserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
})

export const TableSchema = z
  .object({
    name: z.string().min(1, { message: 'Table name is required' }),
    minBuyIn: z
      .string()
      .min(1, { message: 'Minimum buy-in is required' })
      .refine(value => !isNaN(Number(value)), {
        message: 'Minimum buy-in should be a number',
      }),
    maxBuyIn: z
      .string()
      .min(1, { message: 'Maximum buy-in is required' })
      .refine(value => !isNaN(Number(value)), {
        message: 'Maximum buy-in should be a number',
      }),
    ante: z
      .string()
      .min(1, { message: 'Ante is required' })
      .refine(value => !isNaN(Number(value)), {
        message: 'Ante should be a number',
      }),
    chatBanned: z.boolean(),
  })
  .refine(data => Number(data.minBuyIn) >= Number(data.ante), {
    message: 'Ante should be less than or equal to the minimum buy-in',
  })

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum 6 characters required for the password',
    }),
    newPassword: z.string().min(6, {
      message: 'Minimum 6 characters required for the new password',
    }),
    confirmNewPassword: z.string().min(6, {
      message: 'Minimum 6 characters required for confirming the new password',
    }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export const CardActionSchema = z.object({
  amount: z.number().min(1, { message: 'Amount is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
})

export const BankSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: 'Card number is required' })
    .regex(/^[0-9]+$/, { message: 'Card number should be numeric' }),
  securityCode: z.string().min(1, { message: 'Security code is required' }),
  cardHolderName: z
    .string()
    .min(1, { message: 'Card holder name is required' }),
  expiryDate: z.string().min(1, { message: 'Expiry date is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
})

export const RechargeSchema = z.object({
  username: z.string().optional(),
  amount: z
    .string()
    .min(1, { message: 'Amount is required' })
    .regex(/^[0-9]+$/, { message: 'Amount should be numeric' }),
  status: z.string().min(1, { message: 'Status is required' }),
})

export const WithdrawSchema = z.object({
  username: z.string().optional(),
  amount: z
    .string()
    .min(1, { message: 'Amount is required' })
    .regex(/^[0-9]+$/, { message: 'Amount should be numeric' }),
  status: z.string().min(1, { message: 'Status is required' }),
})
