import publicClient from '@/services/api/client/private-client'

const withdrawEndpoints = {
  getAllByBankId: (withdrawId: string) => `withdraws/bank/${withdrawId}`,
  getWithdraws: `withdraws/`,
  getWithdrawById: (withdrawId: string) => `withdraws/${withdrawId}`,
  create: 'withdraws',
  createInternal: 'withdraws/internal',
  delete: (withdrawId: string) => `withdraws/${withdrawId}`,
  update: (withdrawId: string) => `withdraws/${withdrawId}`,
}

const withdrawApi = {
  getWithdrawById: async ({ withdrawId }: { withdrawId: string }) => {
    try {
      const response = await publicClient.get(
        withdrawEndpoints.getWithdrawById(withdrawId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getWithdraws: async () => {
    try {
      const response = await publicClient.get(withdrawEndpoints.getWithdraws)
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getAllByBankId: async ({ bankId }: { bankId: string | undefined }) => {
    try {
      if (!bankId) return { response: [] }

      const response = await publicClient.get(
        withdrawEndpoints.getAllByBankId(bankId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  create: async ({ amount, bankId }: { amount: number; bankId: string }) => {
    try {
      const response = await publicClient.post(withdrawEndpoints.create, {
        amount,
        bankId,
      })
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  createInternal: async ({ amount, username, creator }: { amount: number; username: string; creator: string }) => {
    try {
      const response = await publicClient.post(withdrawEndpoints.createInternal, {
        amount,
        username,
        creator
      })
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  delete: async (withdrawId: string) => {
    try {
      const response = await publicClient.delete(
        withdrawEndpoints.delete(withdrawId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  update: async (data: any, withdrawId: string) => {
    try {
      const response = await publicClient.put(
        withdrawEndpoints.update(withdrawId),
        data
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default withdrawApi
