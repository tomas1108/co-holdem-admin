import userApi from '@/services/api/modules/user-api'
import { LoginSchema } from '@/schemas'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { username, password } = validatedFields.data

          try {
            const { response, error } = await userApi.login({ username, password })
  
            if (!response) {
              return null
            }

            const user = response.user
  
            return user

          } catch (error) {
            console.log('error: ', error)
            return error
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
