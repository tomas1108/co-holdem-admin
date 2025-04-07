'use server'

import { signOut } from '@/auth'
import { currentUser } from '@/lib/auth'
import userApi from '@/services/api/modules/user-api'

export const logout = async () => {
  const user = await currentUser()

  if (!user) return;
  await userApi.logout({ userId: user.id })
  await signOut({ redirectTo: '/auth/login' })
}