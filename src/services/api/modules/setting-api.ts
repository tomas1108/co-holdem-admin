import publicClient from '@/services/api/client/private-client'

const settingEndpoints = {
  getSetting: () => '/settings',
  updateSetting: () => '/settings',
}

const settingApi = {
    getSettings: async () => {
        try {
            const response = await publicClient.get(
              settingEndpoints.updateSetting()
            )
            if (response && response.data) return { settings: response.data }
            return { settings: response }
          } catch (error) {
            return { error }
          }
    },
    createSettings: async (settingData: any) => {
        try {
        const response = await publicClient.post(
            settingEndpoints.updateSetting(),
            {
                ...settingData,
                fee: Number(settingData.fee) / 100
            }
        )
        if (response && response.data) return { settings: response.data }
        return { setting: response }
        } catch (error) {
        return { error }
        }
    },
    updateSettings: async (settingData: any) => {
        try {
        const response = await publicClient.put(
            settingEndpoints.updateSetting(),
            {
                ...settingData,
                fee: Number(settingData.fee) / 100
            }
        )
        if (response && response.data) return { settings: response.data }
        return { setting: response }
        } catch (error) {
        return { error }
        }
    },
}

export default settingApi
