import publicClient from '@/services/api/client/private-client'

const tableEndpoints = {
  getTables: 'tables/',
  getTableById: ({ tableId }: { tableId: string }) => `tables/${tableId}`,
  delete: ({ tableId }: { tableId: string }) => `tables/${tableId}`,
  update: ({ tableId }: { tableId: string }) => `tables/${tableId}`,
  create: 'tables/',
}

const tableApi = {
  getTableById: async (data: { tableId: string }) => {
    try {
      const response = await publicClient.get(tableEndpoints.getTableById(data))
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getTables: async () => {
    try {
      const response = await publicClient.get(tableEndpoints.getTables)
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  delete: async (tableId: string) => {
    try {
      const response = await publicClient.delete(
        tableEndpoints.delete({ tableId })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  update: async (data: any, tableId: string) => {
    try {
      const response = await publicClient.put(
        tableEndpoints.update({ tableId }),
        data
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  create: async (data: any) => {
    try {
      const response = await publicClient.post(tableEndpoints.create, data)
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default tableApi
