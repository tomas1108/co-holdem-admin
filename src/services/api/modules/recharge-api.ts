import publicClient from '@/services/api/client/private-client'

const rechargeEndpoints = {
  getAllByBankId: (rechargeId: string) => `recharges/bank/${rechargeId}`,
  getRecharges: `recharges/`,
  getRechargeById: (rechargeId: string) => `recharges/${rechargeId}`,
  create: 'recharges',
  createInternal: 'recharges/internal',
  delete: (rechargeId: string) => `recharges/${rechargeId}`,
  update: (rechargeId: string) => `recharges/${rechargeId}`,
}

const rechargeApi = {
  getRechargeById: async ({ rechargeId }: { rechargeId: string }) => {
    try {
      const response = await publicClient.get(
        rechargeEndpoints.getRechargeById(rechargeId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getRecharges: async () => {
    try {
      const response = await publicClient.get(rechargeEndpoints.getRecharges)
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
        rechargeEndpoints.getAllByBankId(bankId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  create: async ({ amount, bankId }: { amount: number; bankId: string }) => {
    try {
      const response = await publicClient.post(rechargeEndpoints.create, {
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
      const response = await publicClient.post(rechargeEndpoints.createInternal, {
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
  delete: async (rechargeId: string) => {
    try {
      const response = await publicClient.delete(
        rechargeEndpoints.delete(rechargeId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  update: async (data: any, rechargeId: string) => {
    try {
      const response = await publicClient.put(
        rechargeEndpoints.update(rechargeId),
        data
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default rechargeApi
