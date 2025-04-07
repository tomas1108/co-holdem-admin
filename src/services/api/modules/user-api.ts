import privateClient from '@/services/api/client/private-client'
import publicClient from '@/services/api/client/public-client'

const userEndpoints = {
  getAll: `/users`,
  getUserById: ({ userId }: { userId: string }) => `/users/${userId}`,
  getUserByRole: ({ role }: { role: string }) => `/users/role/${role}`,
  getUserByUsername: ({ username }: { username: string }) =>
    `/users/username/${username}`,
  register: `auth/register`,
  login: `auth/login`,
  logout: `auth/logout`,
  newPassword: ({ userId }: { userId: string }) =>
    `auth/new-password/${userId}`,
  update: ({ userId }: { userId: string }) => `/users/${userId}`,
  delete: ({ userId }: { userId: string }) => `/users/${userId}`,
  updateAll: ({ userId }: { userId: string }) => `/users/${userId}`,
}

const userApi = {
  login: async (data: any) => {
    try {
      const response = await publicClient.post(userEndpoints.login, data)
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error: any) {
      console.log('error in api: ', error)
      return { error: error?.message ?? 'Ямар нэг алдаа гарлаа' }
    }
  },
  register: async (data: {
    email: string
    username: string
    password: string
  }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, data)
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error: any) {
      return { error: error?.message ?? 'Ямар нэг алдаа гарлаа' }
    }
  },
  logout: async (data: any) => {
    try {
      const response = await publicClient.post(userEndpoints.logout, data)
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error: any) {
      return { error: error?.message ?? 'Ямар нэг алдаа гарлаа' }
    }
  },
  getAll: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getAll)
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getUsersByRoleList: async ({ role }: { role: string }) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getUserByRole({ role }),
      )
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getUserById: async ({ userId }: { userId: string }) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getUserById({ userId }),
      )

      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getUserByUsername: async ({ username }: { username: string }) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUserByUsername({ username }),
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  updateUser: async (data: any, userId: string) => {
    try {
      const response = await privateClient.put(
        userEndpoints.update({ userId }),
        data,
      )
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error: 'Ямар нэг алдаа гарлаа' }
    }
  },
  newPassword: async (data: any, userId: string) => {
    try {
      const response = await privateClient.post(
        userEndpoints.newPassword({ userId }),
        data,
      )
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error: 'Ямар нэг алдаа гарлаа' }
    }
  },
  removeUser: async (userId: string) => {
    try {
      const response = await privateClient.delete(
        userEndpoints.delete({ userId }),
      )
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error: 'Ямар нэг алдаа гарлаа' }
    }
  },
  
  updateAll: async (data: any, userId: string) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateAll({ userId }),
        data,
      )
      
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
