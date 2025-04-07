import publicClient from '@/services/api/client/private-client'

const historyEndpoints = {
  getHistories: () => 'histories',
  getAllByUserId: (userId: string) => `histories/user/${userId}`,
}

const historyApi = {
  getHistories: async () => {
    try {
      const response = await publicClient.get(
        historyEndpoints.getHistories()
      )
      if (response && response.data) return { histories: response.data }
      return { histories: response }
    } catch (error) {
      return { error }
    }
  },
  getAllByUserId: async ({ userId }: { userId: string }) => {
    try {
      const response = await publicClient.get(
        historyEndpoints.getAllByUserId(userId)
      )
      if (response && response.data) return { histories: response.data }
      return { histories: response }
    } catch (error) {
      return { error }
    }
  },
}

export default historyApi
